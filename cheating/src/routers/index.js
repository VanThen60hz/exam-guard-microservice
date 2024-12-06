"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

// // check apiKey
// router.use(apiKey);

// // check permission
// router.use(permission("0000"));

// notification router
router.use("/api/notification", require("./notification"));

// cheating router
router.use("/api/cheating", require("./cheating"));

router.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Hello World From Cheating Service",
    });
});

module.exports = router;
