const express = require("express");
const router = express.Router();

/* 시스템 모니터링 */
router.get("/", (req, res, next) => {
    try {
        res.json("hi");
    } catch (err) {
        res.status(500).send(`Throw Exception -> ${err}`);
    }
});

module.exports = router;
