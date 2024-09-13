const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

// initialize Express.js server and save as a variable
// so it can be referred to as `app`
const app = express();

let todos = []; // In-memory storage for todos
app.use(bodyParser.json());
app.use(cors());

// GET endpoint to fetch all todo items
app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const body = req.body;
  todos.push({ ...body, id: uuidv4() });
  res.json(todos);
});

app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const data = todos.map((item) => {
    if (item.id === id) {
      return {...item, ...body};
    }
    return item;
  });
  todos = data;
  res.json(todos);
});
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  todos = todos.filter(item => item.id !== id);
  res.json(todos);
});
console.log("test");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
