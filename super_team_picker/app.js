const path = require("path");
const express = require("express");
const logger = require("morgan");
const app = express();

app.set("view engine", "ejs");
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

const cohortsRouter = require("./routes/cohortsRouter");
app.use("/cohorts", cohortsRouter);

const PORT = 4545;
const ADDRESS = "localhost";
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listenning on http://${ADDRESS}:${PORT}`);
});