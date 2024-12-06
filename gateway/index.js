const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());
// app.use("/", (req, res, next) => {
//     return res.status(200).json({ msg: "Hello from Gateway" });
// });

app.use("/user-service", proxy("http://localhost:8001"));
app.use("/exam-service", proxy("http://localhost:8002"));
app.use("/cheating-service", proxy("http://localhost:8003"));

app.listen(8000, () => {
    console.log("ExamGuard Gateway is Listening to Port 8000");
});
