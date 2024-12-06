const express = require("express");
const http = require("http");
const app = require("./src/app");

const { connectRedis } = require("./src/configs/redis.config");

const PORT = process.env.DEV_APP_PORT;
const server = http.createServer(app);

connectRedis();

server.listen(PORT, () => {
    console.log(`ExamGuard Exam Service is running on port ${PORT}`);
});

process.on("SIGINT", () => {
    server.close(() => {
        console.log("ExamGuard server is closed");
        process.exit(0);
    });
});

module.exports = server;
