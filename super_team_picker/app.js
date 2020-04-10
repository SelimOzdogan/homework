const express = require("express");
const logger = require("morgan");
const app = express();

app.set("view engine", "ejs");
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.render("index");
});




const PORT = 4545;
const ADDRESS = "localhost";
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listenning on http://${ADDRESS}:${PORT}`);
});