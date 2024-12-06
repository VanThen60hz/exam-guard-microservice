const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", proxy("http://localhost:8001"));
app.use("/cheating", proxy("http://localhost:8003"));
app.use("/", proxy("http://localhost:8002")); // exam

app.listen(8000, () => {
    console.log("ExamGuard Gateway is Listening to Port 8000");
});
