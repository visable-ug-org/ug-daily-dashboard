#!/usr/bin/env node

import { RedashClient } from "./lib/redash-client.js";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const D_AB2_TARGET = 500;

// ---------------------------------------------------------------------------
// .env loader (zero dependencies)
// ---------------------------------------------------------------------------
try {
  const envContent = readFileSync(join(__dirname, "..", ".env"), "utf-8");
  for (const line of envContent.split("\n")) {
    const m = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
} catch { /* .env not found — rely on shell env */ }

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------
let targetDate = null;
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--date" && args[i + 1]) { targetDate = args[i + 1]; i++; }
}

const { REDASH_URL, REDASH_API_KEY } = process.env;
if (!REDASH_URL || !REDASH_API_KEY) {
  console.error("Error: set REDASH_URL and REDASH_API_KEY (in .env or shell)");
  process.exit(1);
}

const client = new RedashClient(REDASH_URL, REDASH_API_KEY, 1);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function fmtDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}
function parseDate(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function fmtLabel(s) { return s.slice(5).replace("-", "/"); }
function pct(curr, prev) {
  if (prev === 0) return curr === 0 ? 0 : null;
  return Math.round(((curr - prev) / prev) * 1000) / 10;
}
function normDate(d) {
  if (d instanceof Date) return fmtDate(d);
  return String(d).slice(0, 10);
}

// ---------------------------------------------------------------------------
// Step 1: Detect latest available date
// ---------------------------------------------------------------------------
async function detectDate() {
  console.log("Detecting latest available date…");
  const sqls = [
    "SELECT MAX(date)::VARCHAR AS d FROM metrics_layer.ga_user_metrics WHERE date >= CURRENT_DATE - 7",
    "SELECT MAX(date)::VARCHAR AS d FROM metrics_layer.active_buyers WHERE date >= CURRENT_DATE - 7",
    "SELECT MAX(date)::VARCHAR AS d FROM metrics_layer.app_user_lt_retention WHERE date >= CURRENT_DATE - 7",
  ];
  const results = await Promise.all(sqls.map((s) => client.executeQuery(s)));
  const dates = results.map((r) => r.rows[0]?.d).filter(Boolean).map((d) => normDate(d)).sort();
  if (!dates.length) throw new Error("No recent data found in any table");
  return dates[0];
}

// ---------------------------------------------------------------------------
// Step 2: Build SQL queries
// ---------------------------------------------------------------------------
function buildQueries(td, wd, sd) {
  return {
    q1_uv_trend: `
SELECT date, platform, COUNT(DISTINCT visitor_sk) AS uv
FROM metrics_layer.ga_user_metrics
WHERE date BETWEEN '${sd}' AND '${td}'
  AND platform IN ('ep','wlw')
GROUP BY 1,2 ORDER BY 1,2`,

    q1_uv_channel: `
SELECT date, platform, first_channel_per_day AS channel, COUNT(DISTINCT visitor_sk) AS uv
FROM metrics_layer.ga_user_metrics
WHERE date IN ('${td}', '${wd}')
  AND platform IN ('ep','wlw')
GROUP BY 1,2,3 ORDER BY 1,2,3`,

    q2_app: `
SELECT date, platform, total_dau AS app_uv
FROM metrics_layer.app_user_lt_retention
WHERE date BETWEEN '${sd}' AND '${td}'
  AND platform IN ('ep','wlw')
ORDER BY 1,2`,

    q3_ab: `
SELECT date, platform,
  COUNT(DISTINCT buyer_id) AS ab,
  COUNT(DISTINCT CASE WHEN is_ab2 = true THEN buyer_id END) AS ab2
FROM metrics_layer.active_buyers
WHERE date BETWEEN '${sd}' AND '${td}'
  AND platform IN ('ep','wlw')
GROUP BY 1,2 ORDER BY 1,2`,

    q4_ab_type_trend: `
SELECT date, platform, request_type, COUNT(DISTINCT buyer_id) AS buyers
FROM metrics_layer.active_buyers
WHERE date BETWEEN '${sd}' AND '${td}'
  AND platform IN ('ep','wlw')
GROUP BY 1,2,3 ORDER BY 1,2,3`,

    q4_ab_type_source: `
SELECT date, platform, request_type, request_origin,
  COUNT(DISTINCT buyer_id) AS buyers,
  COUNT(DISTINCT CASE WHEN is_ab2 = true THEN buyer_id END) AS ab2_buyers
FROM metrics_layer.active_buyers
WHERE date IN ('${td}', '${wd}')
  AND platform IN ('ep','wlw')
GROUP BY 1,2,3,4 ORDER BY 1,2,3,4`,

    q5_ab2_source: `
SELECT date, platform, request_origin,
  COUNT(DISTINCT buyer_id) AS ab2
FROM metrics_layer.active_buyers
WHERE is_ab2 = true
  AND date IN ('${td}', '${wd}')
  AND platform IN ('ep','wlw')
GROUP BY 1,2,3 ORDER BY 1,2,3`,
  };
}

// ---------------------------------------------------------------------------
// Step 3: Process query results → JSON structure
// ---------------------------------------------------------------------------
function processData(res, td, wd) {
  const tdObj = parseDate(td);
  const dates14 = Array.from({ length: 14 }, (_, i) => fmtDate(addDays(tdObj, i - 13)));
  const labels = dates14.map(fmtLabel);

  // --- Build lookup maps ---
  function buildMap(rows, dateKey, platKey, valKey, accumulate = true) {
    const m = {};
    for (const r of rows) {
      const d = normDate(r[dateKey]);
      const k = `${d}_${r[platKey]}`;
      m[k] = accumulate ? (m[k] || 0) + Number(r[valKey] || 0) : Number(r[valKey] || 0);
    }
    return m;
  }

  const uvMap = buildMap(res.q1_uv_trend.rows, "date", "platform", "uv");
  const appMap = buildMap(res.q2_app.rows, "date", "platform", "app_uv", false);

  const abMap = {}, ab2Map = {};
  for (const r of res.q3_ab.rows) {
    const d = normDate(r.date);
    abMap[`${d}_${r.platform}`] = Number(r.ab || 0);
    ab2Map[`${d}_${r.platform}`] = Number(r.ab2 || 0);
  }

  const qdrMap = {}, rfqMap = {};
  for (const r of res.q4_ab_type_trend.rows) {
    const d = normDate(r.date);
    const k = `${d}_${r.platform}`;
    if (r.request_type === "quality_direct_request") qdrMap[k] = Number(r.buyers || 0);
    else if (r.request_type === "verified_rfq") rfqMap[k] = Number(r.buyers || 0);
  }

  function extract(map, plat) { return dates14.map((d) => map[`${d}_${plat}`] || 0); }
  function val(map, d, p) { return map[`${d}_${p}`] || 0; }

  // --- Trends ---
  const trends = {
    labels,
    ep_uv: extract(uvMap, "ep"), wlw_uv: extract(uvMap, "wlw"),
    ep_app: extract(appMap, "ep"), wlw_app: extract(appMap, "wlw"),
    ep_qdr: extract(qdrMap, "ep"), wlw_qdr: extract(qdrMap, "wlw"),
    ep_rfq: extract(rfqMap, "ep"), wlw_rfq: extract(rfqMap, "wlw"),
    ep_ab2: extract(ab2Map, "ep"), wlw_ab2: extract(ab2Map, "wlw"),
  };

  // --- Summary (current + prev) ---
  const summary = {};
  for (const p of ["ep", "wlw"]) {
    summary[p] = {
      web_uv: val(uvMap, td, p), web_uv_prev: val(uvMap, wd, p),
      app_uv: val(appMap, td, p), app_uv_prev: val(appMap, wd, p),
      ab: val(abMap, td, p),      ab_prev: val(abMap, wd, p),
      qdr_ab: val(qdrMap, td, p), qdr_ab_prev: val(qdrMap, wd, p),
      rfq_ab: val(rfqMap, td, p), rfq_ab_prev: val(rfqMap, wd, p),
      ab2: val(ab2Map, td, p),    ab2_prev: val(ab2Map, wd, p),
    };
  }

  const epAb2 = summary.ep.ab2, wlwAb2 = summary.wlw.ab2;
  const totalAb2 = epAb2 + wlwAb2;
  summary.d_ab2 = {
    ep: epAb2, wlw: wlwAb2, total: totalAb2,
    target: D_AB2_TARGET,
    gap_pct: D_AB2_TARGET > 0 ? Math.round(((D_AB2_TARGET - totalAb2) / D_AB2_TARGET) * 1000) / 10 : 0,
  };

  const safeRate = (num, den) => den > 0 ? Math.round((num / den) * 1000) / 10 : 0;
  summary.ab_to_ab2_pct = {
    ep: safeRate(summary.ep.ab2, summary.ep.ab),
    wlw: safeRate(summary.wlw.ab2, summary.wlw.ab),
    ep_prev: safeRate(summary.ep.ab2_prev, summary.ep.ab_prev),
    wlw_prev: safeRate(summary.wlw.ab2_prev, summary.wlw.ab_prev),
  };

  // --- Drilldown: UV by channel ---
  function groupChannel(rows, plat) {
    const curr = {}, prev = {};
    for (const r of rows) {
      const d = normDate(r.date);
      if (r.platform !== plat) continue;
      const ch = r.channel || "Others";
      if (d === td) curr[ch] = (curr[ch] || 0) + Number(r.uv || 0);
      else if (d === wd) prev[ch] = (prev[ch] || 0) + Number(r.uv || 0);
    }
    const chs = [...new Set([...Object.keys(curr), ...Object.keys(prev)])]
      .sort((a, b) => (curr[b] || 0) - (curr[a] || 0));
    return chs.map((ch) => ({
      channel: ch,
      current: curr[ch] || 0, prev: prev[ch] || 0,
      wow_pct: pct(curr[ch] || 0, prev[ch] || 0),
    }));
  }

  const sourceOrder = ["web", "app", "alibaba"];

  function groupAbSource(rows, reqType) {
    const result = [];
    for (const p of ["ep", "wlw"]) {
      const srcs = {};
      for (const r of rows) {
        const d = normDate(r.date);
        if (r.platform !== p || r.request_type !== reqType) continue;
        const src = r.request_origin || "unknown";
        if (!srcs[src]) srcs[src] = { current: 0, prev: 0, ab2_current: 0, ab2_prev: 0 };
        if (d === td) {
          srcs[src].current += Number(r.buyers || 0);
          srcs[src].ab2_current += Number(r.ab2_buyers || 0);
        } else if (d === wd) {
          srcs[src].prev += Number(r.buyers || 0);
          srcs[src].ab2_prev += Number(r.ab2_buyers || 0);
        }
      }
      for (const src of sourceOrder) {
        if (srcs[src]) result.push({ platform: p, source: src, ...srcs[src], wow_pct: pct(srcs[src].current, srcs[src].prev) });
      }
    }
    return result;
  }

  const ab2BySource = [];
  for (const p of ["ep", "wlw"]) {
    const srcs = {};
    for (const r of res.q5_ab2_source.rows) {
      const d = normDate(r.date);
      if (r.platform !== p) continue;
      const src = r.request_origin || "unknown";
      if (!srcs[src]) srcs[src] = { current: 0, prev: 0 };
      if (d === td) srcs[src].current += Number(r.ab2 || 0);
      else if (d === wd) srcs[src].prev += Number(r.ab2 || 0);
    }
    for (const src of sourceOrder) {
      if (srcs[src]) ab2BySource.push({ platform: p, source: src, ...srcs[src], wow_pct: pct(srcs[src].current, srcs[src].prev) });
    }
  }

  const drilldown = {
    ep_uv_by_channel: groupChannel(res.q1_uv_channel.rows, "ep"),
    wlw_uv_by_channel: groupChannel(res.q1_uv_channel.rows, "wlw"),
    qdr_ab_by_source: groupAbSource(res.q4_ab_type_source.rows, "quality_direct_request"),
    rfq_ab_by_source: groupAbSource(res.q4_ab_type_source.rows, "verified_rfq"),
    ab2_by_source: ab2BySource,
  };

  // --- Anomaly detection ---
  const anomalies = [];
  const actionHints = {
    "Web UV": "排查渠道变化，关注 Organic / Paid 分布",
    "App UV": "排查 App 推送策略与版本更新",
    AB: "下钻 QDR / RFQ 来源拆分定位",
    "QDR AB": "排查 request_origin 维度（web / app / alibaba）",
    "RFQ AB": "排查 RFQ 分发率与来源",
    AB2: "排查 AB→AB2 转化率变化",
  };

  function addAnomaly(metric, plat, curr, prev) {
    if (prev < 5) return;
    const w = pct(curr, prev);
    if (w === null) return;
    const delta = curr - prev;
    let level, verb;
    if (w <= -50)       { level = "P0"; verb = "暴跌"; }
    else if (w <= -20)  { level = "P1"; verb = "大幅下降"; }
    else if (w <= -10)  { level = "P2"; verb = "下降"; }
    else if (w >= 20)   { level = "OK"; verb = "上涨"; }
    else return;

    const sign = delta >= 0 ? "+" : "";
    anomalies.push({
      level,
      signal: `${plat} ${metric} ${verb} ${w > 0 ? "+" : ""}${w}%（${prev} → ${curr}，Δ${sign}${delta}）`,
      action: level === "OK" ? "持续观察" : actionHints[metric] || "排查原因",
    });
  }

  for (const p of ["ep", "wlw"]) {
    const s = summary[p];
    addAnomaly("Web UV", p, s.web_uv, s.web_uv_prev);
    addAnomaly("App UV", p, s.app_uv, s.app_uv_prev);
    addAnomaly("AB", p, s.ab, s.ab_prev);
    addAnomaly("QDR AB", p, s.qdr_ab, s.qdr_ab_prev);
    addAnomaly("RFQ AB", p, s.rfq_ab, s.rfq_ab_prev);
    addAnomaly("AB2", p, s.ab2, s.ab2_prev);
  }

  const lvlOrd = { P0: 0, P1: 1, P2: 2, OK: 3 };
  anomalies.sort((a, b) => (lvlOrd[a.level] ?? 9) - (lvlOrd[b.level] ?? 9));

  return { summary, trends, drilldown, anomalies };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  if (!targetDate) targetDate = await detectDate();
  console.log(`Target date: ${targetDate}`);

  const tdObj = parseDate(targetDate);
  const wowDate = fmtDate(addDays(tdObj, -7));
  const startDate = fmtDate(addDays(tdObj, -13));
  const latencyDays = Math.max(0, Math.round((Date.now() - tdObj.getTime()) / 86400000));

  console.log(`WoW date:    ${wowDate}`);
  console.log(`Trend start: ${startDate}`);

  const queries = buildQueries(targetDate, wowDate, startDate);
  const entries = Object.entries(queries);

  console.log(`Executing ${entries.length} queries in parallel…`);
  const results = await Promise.all(entries.map(([, sql]) => client.executeQuery(sql)));

  const res = {};
  entries.forEach(([key], i) => { res[key] = results[i]; });

  console.log("Processing data…");
  const { summary, trends, drilldown, anomalies } = processData(res, targetDate, wowDate);

  const output = {
    meta: { date: targetDate, wow_date: wowDate, latency_days: latencyDays, generated_at: new Date().toISOString() },
    summary, trends, drilldown, anomalies,
  };

  mkdirSync(DATA_DIR, { recursive: true });
  const jsonPath = join(DATA_DIR, `${targetDate}.json`);
  writeFileSync(jsonPath, JSON.stringify(output, null, 2));
  console.log(`Written: ${jsonPath}`);

  const manifestPath = join(DATA_DIR, "manifest.json");
  let manifest = [];
  if (existsSync(manifestPath)) {
    try { manifest = JSON.parse(readFileSync(manifestPath, "utf-8")); } catch { /* ignore */ }
  }
  if (!manifest.includes(targetDate)) manifest.push(targetDate);
  manifest.sort().reverse();
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Manifest updated: ${manifest.length} date(s)`);
  console.log("Done ✓");
}

main().catch((err) => { console.error(err); process.exit(1); });
