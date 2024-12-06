"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

// // check apiKey
// router.use(apiKey);

// // check permission
// router.use(permission("0000"));

// grade router
router.use("/api/grade", require("./grade"));

// answer router
router.use("/api/answer", require("./answer"));

// exam router
router.use("/api/question", require("./question"));

// exam router
router.use("/api/exam", require("./exam"));

router.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Hello World From Exam Service",
    });
});

module.exports = router;
