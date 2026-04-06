import https from "node:https";
import http from "node:http";

export class RedashClient {
  constructor(baseUrl, apiKey, dataSourceId = 1) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.apiKey = apiKey;
    this.dataSourceId = dataSourceId;
  }

  request(method, path, body) {
    return new Promise((resolve, reject) => {
      const url = new URL(path, this.baseUrl);
      const isHttps = url.protocol === "https:";
      const transport = isHttps ? https : http;
      const options = {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method,
        headers: {
          Authorization: `Key ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        rejectUnauthorized: false,
        timeout: 60000,
      };
      const req = transport.request(options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk.toString()));
        res.on("end", () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 500)}`));
            return;
          }
          try { resolve(JSON.parse(data)); }
          catch { reject(new Error(`Invalid JSON: ${data.slice(0, 200)}`)); }
        });
      });
      req.on("error", reject);
      req.on("timeout", () => { req.destroy(); reject(new Error("Request timeout")); });
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  }

  async pollJob(jobId, maxWaitMs = 300000) {
    const start = Date.now();
    const pollInterval = 1500;
    while (Date.now() - start < maxWaitMs) {
      const resp = await this.request("GET", `/api/jobs/${jobId}`);
      const job = resp.job;
      if (job.status >= 3) return job;
      await new Promise((r) => setTimeout(r, pollInterval));
    }
    throw new Error(`Query timed out after ${maxWaitMs}ms`);
  }

  async executeQuery(sql) {
    const resp = await this.request("POST", "/api/query_results", {
      query: sql,
      data_source_id: this.dataSourceId,
      max_age: 0,
    });
    const job = await this.pollJob(resp.job.id);
    if (job.status === 4) throw new Error(`Query failed: ${job.error}`);
    if (job.status === 5) throw new Error("Query was cancelled");
    if (!job.query_result_id) throw new Error("No query result ID returned");
    const result = await this.request("GET", `/api/query_results/${job.query_result_id}.json`);
    return result.query_result.data;
  }
}
