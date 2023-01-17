const express = require("express");
var bodyParser = require("body-parser");

let data = [
  { id: 1, name: "Younes", email: "youn.henni@gmail.com" },
  { id: 2, name: "dmekj", email: "djjw@gma.co" },
];

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json(data);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const user = data.find((user) => user.id == id);
  if (user) res.status(200).json(user);
  else res.status(404).send("Not found");
});

app.post("/", (req, res) => {
  const user = req.body;
  data.push({ ...user, id: data.slice(-1)[0].id + 1 });
  res.status(201).send("Created");
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const user = req.body;
  const index = data.findIndex((user) => user.id == id);
  data[index] = { ...user, id: id };
  res.status(200).send("Updated");
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = data.findIndex((user) => user.id == id);
  data.splice(index, 1);
  res.status(200).send("Deleted");
});

app.use(express.static("frontend"));
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
