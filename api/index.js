const express = require("express");
const router = express.Router();
const si = require('systeminformation');

/* 시스템 정보 */
router.get("/info", async (req, res) => {
    let obj = {}
    // 운영체제 정보
    await si.osInfo().then(({platform, distro, release}) => {
        obj = Object.assign(obj, {platform, distro, release})
    }).catch((err) => {
        console.error(`Throw Exception -> ${err}`);
    })

    // CPU 정보
    await si.cpu().then(({brand}) => {
        obj = Object.assign(obj, {brand})
    }).catch((err) => {
        console.error(`Throw Exception -> ${err}`);
    })

    // Ram 정보
    await si.mem().then(({total}) => {
        obj = Object.assign(obj, {total})
    }).catch((err) => {
        console.error(`Throw Exception -> ${err}`);
    })

    res.json(obj);
});

/* 사용량 출력 */
router.get("/usage", async (req, res) => {
    let obj = {}

    // CPU 사용률
    await si.currentLoad().then(({cpus}) => {
        const usage = cpus.reduce((acc, cur) => {
            return acc + cur.load
        }, 0) / cpus.length
        obj = Object.assign(obj, {cpu: usage.toFixed(2)})
    }).catch((err) => {
        console.error(`Throw Exception -> ${err}`);
    })

    // 메모리 사용률
    await si.mem().then(({used, total}) => {
        const usage = used/total*100
        obj = Object.assign(obj, {ram:usage.toFixed(2)})
    }).catch((err) => {
        console.error(`Throw Exception -> ${err}`);
    })

    // 네트워크 사용률
     await si.networkStats().then((props) => {
        const {rx_bytes, tx_bytes} = props[0]
        obj = Object.assign(obj, {rx_bytes, tx_bytes})
    }).catch((err) => {
        console.error(`Throw Exception -> ${err}`);
    })

    res.json(obj);
})

/* 프로세스 리스트 */
router.get("/process", async (req, res) => {
    let obj = {}
    await si.processes().then((result) => {
        obj = Object.assign(obj, result)
    }).catch((err) =>{
        console.error(`Throw Exception -> ${err}`);
    })

    res.json(obj);
})

/* 파일 탐색 
router.get("/file" (req, res) => {

})
*/

module.exports = router;
