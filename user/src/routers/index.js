"use strict";

const express = require("express");
const { apiKey, permission } = require("../auth/checkAuth");
const router = express.Router();

// // check apiKey
// router.use(apiKey);

// // check permission
// router.use(permission("0000"));

// user router
router.use("/api/user", require("./user"));

// access router
router.use("/api/auth", require("./access"));

router.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Hello World From User Service",
    });
});

module.exports = router;
