const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/ssl", require("./routes/ssl"))

app.listen(port, () =>
  console.log(`Example app listening at ${port}`)
);
