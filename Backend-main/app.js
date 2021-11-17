const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Import all routes
const auth = require("./routes/auth");
const courses = require("./routes/course");
const careercounsellors = require("./routes/careerCounsellor");
const exams = require("./routes/exam");
const user = require("./routes/user");
const institutes = require("./routes/institute");
const events = require("./routes/event");
const advertisment = require("./routes/advertisement");
const student = require("./routes/student");

app.use("/api", auth);

// app.use(function (req, res, next) {
//   const token = req.header("token");
//   if (!token) return res.status(401).json({ message: "Auth Error" });

//   try {
//     const decoded = jwt.verify(token, "randomString");
//     req.user = decoded.user;
//     next();
//   } catch (e) {
//     console.error(e);
//     res.status(500).send({ message: "Invalid Token" });
//   }
// });

app.use("/api", courses);
app.use("/api", careercounsellors);
app.use("/api", exams);
app.use("/api", user);
app.use("/api", institutes);
app.use("/api", events);
app.use("/api", advertisment);
app.use("/api", student);

module.exports = app;
