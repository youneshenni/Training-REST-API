const express = require("express");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let data;

app.post("/", (req, res) => {
  data = req.body;
  res.status(201).send("Hello World 3");
});

app.get("/", (req, res) => {
  res.status(200).json(data);
});

app.use(express.static("frontend"));
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
