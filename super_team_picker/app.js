const express = require("express");
const app = express();


const PORT = 4545;
const ADDRESS = "localhost";
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listenning on http://${ADDRESS}:${PORT}`);
});