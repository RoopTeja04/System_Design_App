const express = require("express");
const ConnectDB = require("./DB_Config/ConfigDB");
const cors = require("cors");
const FeedRouter = require("./Routes/PostRoutes");

ConnectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("server 6001 is Running");
});

app.use((req, res, next) => {
  console.log("🔥 Incoming URL:", req.originalUrl);
  next();
});

app.use("/feed", FeedRouter);

app.use((req, res, next) => {
  res.setHeader("X-Server-Port", "6001");
  next();
});

app.get("/healthz", (req, res) => {
  res.send("Health is Fine at Second Micro server 6001");
});

app.listen("6001", (req, res) => {
  console.log("Second Micro server 6001 is Running");
});
