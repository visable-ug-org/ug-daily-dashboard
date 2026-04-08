// Shared DATA object — loaded by both index.html (Chinese) and en.html (English)
// Update this file only when adding new dates or modifying data.
const DATA = {
  "2026-04-04": {
    title: "2026-04-04（周六）",
    title_en: "2026-04-04 (Sat)",
    wowDate: "2026-03-28（上周六）",
    wowDate_en: "2026-03-28 (Prev Sat)",
    latency: 2,
    genDate: "2026-04-06",
    verdict: "UV 降 → AB 降 → 但 AB2 逆势增长。AB→AB2% 从 13.8% 提升至 21.5%。",
    verdict_en: "UV down → AB down → but AB2 surged against the trend. AB→AB2% improved from 13.8% to 21.5%.",
    summary: {
      webUV: 29307, webUVPrev: 35294,
      appUV: 983, appUVPrev: 3780,
      ab: 461, abPrev: 494,
      qdrAB: 279, qdrABPrev: 295,
      rfqAB: 206, rfqABPrev: 213,
      ab2: 99, ab2Prev: 68, ab2Color: "#16a34a"
    },
    trends: {
      labels: ["03/22","03/23","03/24","03/25","03/26","03/27","03/28","03/29","03/30","03/31","04/01","04/02","04/03","04/04"],
      epUV: [18073,31807,32149,32091,31606,28027,17956,18044,32261,31328,29651,28148,22906,15901],
      wlwUV: [19055,31158,30389,31114,30201,25729,17338,19049,29522,27873,24577,23006,17507,13406],
      epApp: [1082,1475,1685,1773,2523,2298,2877,2938,1495,1327,1052,1188,971,829],
      wlwApp: [322,387,487,626,641,713,903,852,413,334,233,256,244,154],
      epQDR: [198,435,367,369,386,298,205,205,364,400,331,312,277,216],
      wlwQDR: [81,238,226,237,256,187,90,88,228,157,186,154,78,63],
      epRFQ: [153,367,306,281,329,234,146,180,301,320,314,251,226,150],
      wlwRFQ: [62,146,120,130,123,90,67,70,122,97,109,107,65,56],
      epAB2: [60,256,183,183,208,145,61,69,212,210,194,180,143,92],
      wlwAB2: [9,58,37,36,44,40,7,5,40,25,41,28,14,7],
      epUVT7: [17935,31710,31395,30562,28742,26113,16940,18073,31807,32149,32091,31606,28027,17956],
      wlwUVT7: [20462,33310,32784,31718,30219,26309,16554,19055,31158,30389,31114,30201,25729,17338],
      epAppT7: [850,930,983,949,1312,1064,1002,1082,1475,1685,1773,2523,2298,2877],
      wlwAppT7: [167,223,253,223,293,354,259,322,387,487,626,641,713,903],
      epQDRT7: [273,415,353,344,306,248,200,198,435,367,369,386,298,205],
      wlwQDRT7: [92,219,214,248,224,156,77,81,238,226,237,256,187,90],
      epRFQT7: [186,281,295,296,297,223,123,153,367,306,281,329,234,146],
      wlwRFQT7: [84,145,159,113,126,81,46,62,146,120,130,123,90,67],
      epAB2T7: [73,203,187,179,163,134,55,60,256,183,183,208,145,61],
      wlwAB2T7: [8,56,50,41,34,27,7,9,58,37,36,44,40,7]
    },
    drill: {
      uvWebTotals: [
        ['ep','PC',4646,5385],['ep','WAP',11252,12573],['ep','(unknown)',4,0],
        ['wlw','PC',3423,4545],['wlw','WAP',9983,12794],['wlw','(unknown)',1,1]
      ],
      uvWebRows: [
        ['ep','(unknown)','organic_search',3,0],['ep','(unknown)','direct',1,0],
        ['ep','PC','organic_search',2868,3426],['ep','PC','direct',1219,1299],['ep','PC','referral',231,289],['ep','PC','geo',145,173],['ep','PC','email',119,130],['ep','PC','display_performance',92,99],['ep','PC','Others',9,14],
        ['ep','WAP','organic_search',9514,10774],['ep','WAP','direct',1195,1245],['ep','WAP','geo',298,318],['ep','WAP','referral',136,113],['ep','WAP','email',78,76],['ep','WAP','display_performance',46,45],['ep','WAP','Others',29,39],
        ['wlw','(unknown)','organic_search',1,1],
        ['wlw','PC','organic_search',2596,3404],['wlw','PC','direct',422,504],['wlw','PC','paid_search',154,297],['wlw','PC','referral',134,205],['wlw','PC','email',57,66],['wlw','PC','geo',46,44],['wlw','PC','Others',27,39],
        ['wlw','WAP','organic_search',8766,11007],['wlw','WAP','direct',788,979],['wlw','WAP','paid_search',249,628],['wlw','WAP','geo',110,123],['wlw','WAP','referral',44,50],['wlw','WAP','email',29,19],['wlw','WAP','Others',11,13]
      ],
      uvAppTotals: [['ep',836,2877],['wlw',155,903]],
      abWebTotals: [
        ['ep',false,'(unknown)',69,43],['ep',false,'PC',19,38],['ep',false,'WAP',17,18],
        ['ep',true,'(unknown)',17,11],['ep',true,'PC',13,5],['ep',true,'WAP',9,7],
        ['wlw',false,'(unknown)',24,14],['wlw',false,'PC',3,18],['wlw',false,'WAP',13,25],
        ['wlw',true,'(unknown)',2,0],['wlw',true,'PC',0,2],['wlw',true,'WAP',0,1]
      ],
      abWebRows: [
        ['ep','(unknown)',false,'(unknown)',69,43],
        ['ep','PC',false,'direct',10,14],['ep','PC',false,'organic_search',6,13],['ep','PC',false,'referral',2,6],['ep','PC',false,'geo',1,3],['ep','PC',false,'email',1,1],['ep','PC',false,'Others',0,1],
        ['ep','WAP',false,'organic_search',12,10],['ep','WAP',false,'referral',2,0],['ep','WAP',false,'geo',2,2],['ep','WAP',false,'direct',1,6],
        ['ep','(unknown)',true,'(unknown)',17,11],
        ['ep','PC',true,'organic_search',8,2],['ep','PC',true,'direct',4,0],['ep','PC',true,'geo',1,0],['ep','PC',true,'display_performance',0,1],['ep','PC',true,'email',0,2],
        ['ep','WAP',true,'organic_search',7,5],['ep','WAP',true,'geo',2,0],['ep','WAP',true,'referral',0,1],['ep','WAP',true,'direct',0,1],
        ['wlw','(unknown)',false,'(unknown)',24,14],
        ['wlw','PC',false,'organic_search',2,10],['wlw','PC',false,'direct',1,4],['wlw','PC',false,'paid_search',0,3],['wlw','PC',false,'email',0,1],
        ['wlw','WAP',false,'organic_search',6,19],['wlw','WAP',false,'geo',3,0],['wlw','WAP',false,'paid_search',3,5],['wlw','WAP',false,'direct',1,1],
        ['wlw','(unknown)',true,'(unknown)',2,0],
        ['wlw','PC',true,'paid_search',0,2],['wlw','WAP',true,'organic_search',0,1]
      ],
      abSourceTotals: [
        ['ep','app',false,72,87],['ep','app',true,31,27],['ep','alibaba',false,119,125],['ep','alibaba',true,27,12],
        ['wlw','app',false,6,12],['wlw','app',true,1,4],['wlw','alibaba',false,69,82],['wlw','alibaba',true,4,0]
      ]
    },
    anomalies: [
      {level:'P0', badge:'badge-p0', icon:'❌ P0', bg:'#fef2f2', signal:'App UV ep -71.2%, wlw -82.9%（工作日同比亦 -60%+，真实下降）', signal_en:'App UV ep -71.2%, wlw -82.9% (also -60%+ WoW on weekdays — real decline)', action:'排查 App UV 大幅下滑根因', action_en:'Investigate root cause of App UV sharp decline'},
      {level:'P1', badge:'badge-p1', icon:'❌ P1', bg:'#fef2f2', signal:'wlw Paid Search UV -56.6%（-517，贡献跌幅 13%）', signal_en:'wlw Paid Search UV -56.6% (-517, 13% of total decline)', action:'排查 wlw Paid Search 掉量根因', action_en:'Investigate wlw Paid Search traffic drop'},
      {level:'P1', badge:'badge-p1', icon:'❌ P1', bg:'#fef2f2', signal:'wlw Organic Search UV -21.2%（-3,047，贡献跌幅 78%）', signal_en:'wlw Organic Search UV -21.2% (-3,047, 78% of total decline)', action:'先观察周一，若连续下降再下钻页面类型', action_en:'Monitor Monday; drill into page types if decline persists'},
      {level:'P1', badge:'badge-p1', icon:'❌ P1', bg:'#fef2f2', signal:'wlw QDR AB -30.0%（app -57.1%, web -31.6%）', signal_en:'wlw QDR AB -30.0% (app -57.1%, web -31.6%)', action:'排查 App UV；Web 下钻渠道×页面', action_en:'Investigate App UV; drill Web by channel × page type'},
      {level:'P2', badge:'badge-p2', icon:'⚠️ P2', bg:'#fffbeb', signal:'wlw AB→AB2% = 6.0%（ep 为 26.7%），alibaba 回复率最低', signal_en:'wlw AB→AB2% = 6.0% (ep at 26.7%), Alibaba reply rate lowest', action:'验证 wlw Alibaba 回复率与供给质量', action_en:'Verify wlw Alibaba reply rate & supply quality'},
      {level:'OK', badge:'badge-ok', icon:'✅', bg:'', signal:'ep Organic Search UV -12.8%，周六正常回落', signal_en:'ep Organic Search UV -12.8%, normal Saturday pullback', action:'持续观察', action_en:'Continue monitoring'},
      {level:'OK', badge:'badge-ok', icon:'✅', bg:'#f0fdf4', signal:'ep QDR AB +5.4%（web +14.3%, alibaba +28.9% 对冲 app -12.6%）', signal_en:'ep QDR AB +5.4% (web +14.3%, alibaba +28.9% offset app -12.6%)', action:'无需行动', action_en:'No action needed'},
      {level:'OK', badge:'badge-ok', icon:'✅', bg:'#f0fdf4', signal:'ep RFQ AB +2.7%（web +31%, app +18%），alibaba -8.3% 小幅拖累', signal_en:'ep RFQ AB +2.7% (web +31%, app +18%), alibaba -8.3% minor drag', action:'持续观察', action_en:'Continue monitoring'},
      {level:'OK', badge:'badge-ok', icon:'✅', bg:'#f0fdf4', signal:'ep AB2 +50.8%（AB→AB2% 18.1%→26.7%）', signal_en:'ep AB2 +50.8% (AB→AB2% 18.1% → 26.7%)', action:'复用 Alibaba 改善经验到 wlw', action_en:'Replicate Alibaba improvement to wlw'}
    ]
  },
  "2026-04-05": {
    title: "2026-04-05（周日）",
    title_en: "2026-04-05 (Sun)",
    wowDate: "2026-03-29（上周日）",
    wowDate_en: "2026-03-29 (Prev Sun)",
    latency: 2,
    genDate: "2026-04-08",
    verdict: "周日全线回落。wlw AB/AB2 同步下滑，ep AB2 仍有韧性（72 vs prev 69，+4.3%）。",
    verdict_en: "Sunday across-the-board decline. wlw AB/AB2 fell in tandem; ep AB2 remained resilient (72 vs prev 69, +4.3%).",
    summary: {
      webUV: 29356, webUVPrev: 37093,
      appUV: 992, appUVPrev: 3790,
      ab: 438, abPrev: 524,
      qdrAB: 272, qdrABPrev: 293,
      rfqAB: 185, rfqABPrev: 250,
      ab2: 78, ab2Prev: 74, ab2Color: "#16a34a"
    },
    trends: {
      labels: ["03/23","03/24","03/25","03/26","03/27","03/28","03/29","03/30","03/31","04/01","04/02","04/03","04/04","04/05"],
      epUV: [31807,32149,32091,31606,28027,17956,18044,32261,31328,29651,28148,22906,15901,15375],
      wlwUV: [31158,30389,31114,30201,25729,17338,19049,29522,27873,24577,23006,17507,13406,13981],
      epApp: [1475,1685,1773,2523,2298,2877,2938,1495,1327,1052,1188,972,836,847],
      wlwApp: [387,487,626,641,713,903,852,413,334,233,256,244,155,145],
      epQDR: [435,367,369,386,298,205,205,364,400,331,312,277,216,223],
      wlwQDR: [238,226,237,256,187,90,88,228,157,186,154,78,63,49],
      epRFQ: [367,306,281,329,234,146,180,301,320,314,251,226,150,136],
      wlwRFQ: [146,120,130,123,90,67,70,122,97,109,107,65,56,49],
      epAB2: [256,183,183,208,145,61,69,212,210,194,180,143,92,72],
      wlwAB2: [58,37,36,44,40,7,5,40,25,41,28,14,7,6],
      epUVT7: [31710,31395,30562,28742,26113,16940,18073,31807,32149,32091,31606,28027,17956,18044],
      wlwUVT7: [33310,32784,31718,30219,26309,16554,19055,31158,30389,31114,30201,25729,17338,19049],
      epAppT7: [930,983,949,1312,1064,1002,1082,1475,1685,1773,2523,2298,2877,2938],
      wlwAppT7: [223,253,223,293,354,259,322,387,487,626,641,713,903,852],
      epQDRT7: [415,353,344,306,248,200,198,435,367,369,386,298,205,205],
      wlwQDRT7: [219,214,248,224,156,77,81,238,226,237,256,187,90,88],
      epRFQT7: [281,295,296,297,223,123,153,367,306,281,329,234,146,180],
      wlwRFQT7: [145,159,113,126,81,46,62,146,120,130,123,90,67,70],
      epAB2T7: [203,187,179,163,134,55,60,256,183,183,208,145,61,69],
      wlwAB2T7: [56,50,41,34,27,7,9,58,37,36,44,40,7,5]
    },
    drill: {
      uvWebTotals: [],
      uvWebRows: [
        ['ep','Others','direct',2147,2338],['ep','Others','display_performance',151,143],['ep','Others','email',174,184],['ep','Others','geo',454,585],['ep','Others','organic_search',11976,14266],['ep','Others','organic_social',19,29],['ep','Others','other',15,12],['ep','Others','paid_search',14,8],['ep','Others','referral',328,360],['ep','Others','(unknown)',97,113],
        ['wlw','Others','affiliate',4,7],['wlw','Others','app',1,2],['wlw','Others','direct',1222,1635],['wlw','Others','display_performance',25,20],['wlw','Others','email',49,68],['wlw','Others','geo',158,182],['wlw','Others','organic_search',11694,15831],['wlw','Others','organic_social',3,0],['wlw','Others','other',12,20],['wlw','Others','paid_search',576,943],['wlw','Others','referral',183,255],['wlw','Others','(unknown)',54,86]
      ],
      uvAppTotals: [['ep',847,2938],['wlw',145,852]],
      abWebTotals: [],
      abWebRows: [
        ['ep','Others',false,'Others',91,82],['ep','Others',true,'Others',35,25],
        ['wlw','Others',false,'Others',33,66],['wlw','Others',true,'Others',3,2]
      ],
      abSourceTotals: [
        ['ep','app',false,84,91],['ep','app',true,24,32],['ep','alibaba',false,127,151],['ep','alibaba',true,14,13],
        ['wlw','app',false,5,8],['wlw','app',true,2,2],['wlw','alibaba',false,55,78],['wlw','alibaba',true,1,1]
      ]
    },
    anomalies: [
      {level:'P0', badge:'badge-p0', icon:'❌ P0', bg:'#fef2f2', signal:'ep App UV 暴跌 -71.4%（2938 → 840，Δ-2098）', signal_en:'ep App UV crashed -71.4% (2938 → 840, Δ-2098)', action:'排查 App 推送策略与版本更新', action_en:'Investigate App push strategy & version update'},
      {level:'P0', badge:'badge-p0', icon:'❌ P0', bg:'#fef2f2', signal:'wlw App UV 暴跌 -83.1%（852 → 144，Δ-708）', signal_en:'wlw App UV crashed -83.1% (852 → 144, Δ-708)', action:'排查 App 推送策略与版本更新', action_en:'Investigate App push strategy & version update'},
      {level:'P1', badge:'badge-p1', icon:'❌ P1', bg:'#fef2f2', signal:'ep RFQ AB 大幅下降 -24.4%（180 → 136，Δ-44）', signal_en:'ep RFQ AB significant drop -24.4% (180 → 136, Δ-44)', action:'排查 RFQ 分发率与来源', action_en:'Investigate RFQ distribution rate & source'},
      {level:'P1', badge:'badge-p1', icon:'❌ P1', bg:'#fef2f2', signal:'wlw Web UV 大幅下降 -26.6%（19049 → 13981，Δ-5068）', signal_en:'wlw Web UV significant drop -26.6% (19049 → 13981, Δ-5068)', action:'排查渠道变化，关注 Organic / Paid 分布', action_en:'Investigate channel changes, focus on Organic / Paid split'},
      {level:'P1', badge:'badge-p1', icon:'❌ P1', bg:'#fef2f2', signal:'wlw AB 大幅下降 -37.8%（156 → 97，Δ-59）', signal_en:'wlw AB significant drop -37.8% (156 → 97, Δ-59)', action:'下钻 QDR / RFQ 来源拆分定位', action_en:'Drill into QDR / RFQ source split'},
      {level:'P1', badge:'badge-p1', icon:'❌ P1', bg:'#fef2f2', signal:'wlw QDR AB 大幅下降 -44.3%（88 → 49，Δ-39）', signal_en:'wlw QDR AB significant drop -44.3% (88 → 49, Δ-39)', action:'排查 request_origin 维度', action_en:'Investigate request_origin dimension'},
      {level:'P1', badge:'badge-p1', icon:'❌ P1', bg:'#fef2f2', signal:'wlw RFQ AB 大幅下降 -30%（70 → 49，Δ-21）', signal_en:'wlw RFQ AB significant drop -30% (70 → 49, Δ-21)', action:'排查 RFQ 分发率与来源', action_en:'Investigate RFQ distribution rate & source'},
      {level:'P2', badge:'badge-p2', icon:'⚠️ P2', bg:'#fffbeb', signal:'ep Web UV 下降 -14.8%（18044 → 15375，Δ-2669）', signal_en:'ep Web UV down -14.8% (18044 → 15375, Δ-2669)', action:'排查渠道变化，关注 Organic / Paid 分布', action_en:'Investigate channel changes, focus on Organic / Paid split'},
      {level:'OK', badge:'badge-ok', icon:'✅', bg:'#f0fdf4', signal:'ep AB2 韧性 +4.3%（69 → 72），AB→AB2% 21.1%', signal_en:'ep AB2 resilient +4.3% (69 → 72), AB→AB2% 21.1%', action:'持续观察', action_en:'Continue monitoring'},
      {level:'OK', badge:'badge-ok', icon:'✅', bg:'', signal:'wlw AB2 微涨 +20%（5 → 6，绝对值小）', signal_en:'wlw AB2 slight uptick +20% (5 → 6, small absolute value)', action:'持续观察', action_en:'Continue monitoring'}
    ]
  },
  "2026-04-06": {
    title: "2026-04-06（周一）",
    title_en: "2026-04-06 (Mon)",
    wowDate: "2026-03-30（上周一）",
    wowDate_en: "2026-03-30 (Prev Mon)",
    latency: 2,
    genDate: "2026-04-08",
    verdict: "较周日环比回升，但周同比仍显著下滑。AB2 总量 169，距 500 目标仍有较大 gap。",
    verdict_en: "Recovered vs Sunday, but still significantly down WoW. AB2 at 169, sizable gap to 500 target remains.",
    summary: {
      webUV: 38339, webUVPrev: 61783,
      appUV: 1048, appUVPrev: 1908,
      ab: 619, abPrev: 972,
      qdrAB: 392, qdrABPrev: 592,
      rfqAB: 250, rfqABPrev: 423,
      ab2: 169, ab2Prev: 252, ab2Color: "#dc2626"
    },
    trends: {
      labels: ["03/24","03/25","03/26","03/27","03/28","03/29","03/30","03/31","04/01","04/02","04/03","04/04","04/05","04/06"],
      epUV: [32149,32091,31606,28027,17956,18044,32261,31328,29651,28148,22906,15901,15375,20703],
      wlwUV: [30389,31114,30201,25729,17338,19049,29522,27873,24577,23006,17507,13406,13981,17636],
      epApp: [1685,1773,2523,2298,2877,2938,1495,1327,1052,1188,972,840,847,882],
      wlwApp: [487,626,641,713,903,852,413,334,233,256,244,156,145,166],
      epQDR: [367,369,386,298,205,205,364,400,331,312,277,216,223,300],
      wlwQDR: [226,237,256,187,90,88,228,157,186,154,78,63,49,92],
      epRFQ: [306,281,329,234,146,180,301,320,314,251,226,150,136,202],
      wlwRFQ: [120,130,123,90,67,70,122,97,109,107,65,56,49,48],
      epAB2: [183,183,208,145,61,69,212,210,194,180,143,92,72,162],
      wlwAB2: [37,36,44,40,7,5,40,25,41,28,14,7,6,7],
      epUVT7: [31395,30562,28742,26113,16940,18073,31807,32149,32091,31606,28027,17956,18044,32261],
      wlwUVT7: [32784,31718,30219,26309,16554,19055,31158,30389,31114,30201,25729,17338,19049,29522],
      epAppT7: [983,949,1312,1064,1002,1082,1475,1685,1773,2523,2298,2877,2938,1495],
      wlwAppT7: [253,223,293,354,259,322,387,487,626,641,713,903,852,413],
      epQDRT7: [353,344,306,248,200,198,435,367,369,386,298,205,205,364],
      wlwQDRT7: [214,248,224,156,77,81,238,226,237,256,187,90,88,228],
      epRFQT7: [295,296,297,223,123,153,367,306,281,329,234,146,180,301],
      wlwRFQT7: [159,113,126,81,46,62,146,120,130,123,90,67,70,122],
      epAB2T7: [187,179,163,134,55,60,256,183,183,208,145,61,69,212],
      wlwAB2T7: [50,41,34,27,7,9,58,37,36,44,40,7,5,40]
    },
    drill: {
      uvWebTotals: [],
      uvWebRows: [
        ['ep','Others','direct',3392,4892],['ep','Others','display_performance',175,157],['ep','Others','email',495,753],['ep','Others','geo',624,901],['ep','Others','organic_search',15246,24453],['ep','Others','organic_social',50,52],['ep','Others','other',22,29],['ep','Others','paid_search',22,22],['ep','Others','referral',522,778],['ep','Others','(unknown)',155,220],
        ['wlw','Others','affiliate',7,25],['wlw','Others','direct',1554,2894],['wlw','Others','display_brand',1,0],['wlw','Others','display_performance',26,31],['wlw','Others','email',83,523],['wlw','Others','geo',189,302],['wlw','Others','organic_search',14326,23000],['wlw','Others','organic_social',5,4],['wlw','Others','organic_video',1,1],['wlw','Others','other',9,17],['wlw','Others','paid_search',1118,2122],['wlw','Others','referral',248,475],['wlw','Others','(unknown)',69,127]
      ],
      uvAppTotals: [['ep',882,1495],['wlw',166,413]],
      abWebTotals: [],
      abWebRows: [
        ['ep','Others',false,'Others',142,187],['ep','Others',true,'Others',73,92],
        ['wlw','Others',false,'Others',59,193],['wlw','Others',true,'Others',1,30]
      ],
      abSourceTotals: [
        ['ep','app',false,86,111],['ep','app',true,54,73],['ep','alibaba',false,144,197],['ep','alibaba',true,35,53],
        ['wlw','app',false,11,14],['wlw','app',true,3,3],['wlw','alibaba',false,65,111],['wlw','alibaba',true,3,7]
      ]
    },
    anomalies: [
      {level:'P0', badge:'badge-p0', icon:'❌ P0', bg:'#fef2f2', signal:'AB2 总量 -32.9%（252 → 169），距 500 目标 gap 仍大', signal_en:'AB2 total -32.9% (252 → 169), sizable gap to 500 target', action:'排查 AB2 回落主因（ep web/app/alibaba）', action_en:'Investigate AB2 decline root cause (ep web/app/alibaba)'},
      {level:'P0', badge:'badge-p0', icon:'❌ P0', bg:'#fef2f2', signal:'wlw AB2 -82.5%（40 → 7），web AB2 仅 1', signal_en:'wlw AB2 -82.5% (40 → 7), web AB2 only 1', action:'排查 wlw 线索质量与回复链路', action_en:'Investigate wlw lead quality & reply pipeline'},
      {level:'P1', badge:'badge-p1', icon:'❌ P1', bg:'#fef2f2', signal:'Web UV -37.9%（61,783 → 38,339），Organic Search 与 Paid Search 同时走弱', signal_en:'Web UV -37.9% (61,783 → 38,339), Organic Search & Paid Search both weakening', action:'排查 SEO/SEA 同步掉量原因', action_en:'Investigate concurrent SEO/SEA traffic drop'},
      {level:'P1', badge:'badge-p1', icon:'❌ P1', bg:'#fef2f2', signal:'App UV -45.1%（1,908 → 1,048）', signal_en:'App UV -45.1% (1,908 → 1,048)', action:'排查 App 流量来源与活跃机制', action_en:'Investigate App traffic sources & engagement'},
      {level:'P1', badge:'badge-p1', icon:'❌ P1', bg:'#fef2f2', signal:'RFQ AB -40.9%（423 → 250）', signal_en:'RFQ AB -40.9% (423 → 250)', action:'排查 RFQ 分发效率与 Alibaba 供给质量', action_en:'Investigate RFQ distribution efficiency & Alibaba supply quality'},
      {level:'P1', badge:'badge-p1', icon:'❌ P1', bg:'#fef2f2', signal:'QDR AB -33.8%（592 → 392）', signal_en:'QDR AB -33.8% (592 → 392)', action:'下钻 web/app/alibaba 的买家转化损失', action_en:'Drill into web/app/alibaba buyer conversion loss'},
      {level:'OK', badge:'badge-ok', icon:'✅', bg:'#f0fdf4', signal:'较昨日环比回升：AB2 78 → 169，QDR AB 272 → 392', signal_en:'DoD recovery: AB2 78 → 169, QDR AB 272 → 392', action:'持续观察周内趋势，避免周末低基数干扰', action_en:'Continue monitoring weekly trend; avoid weekend low-base distortion'}
    ]
  }
};
