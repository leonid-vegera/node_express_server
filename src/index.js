"use strict";

import express from "express";
import cors from "cors";
import * as todoControllers from "./controllers/todos.js";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.get("/todos", todoControllers.getAll);

app.get("/todos/:todoId", todoControllers.getOne);

app.post("/todos", express.json(), todoControllers.add);

app.delete("/todos/:todoId", todoControllers.remove);

app.put("/todos/:todoId", express.json(), todoControllers.update);

app.patch("/todos", express.json(), (req, res) => {
  const { action } = req.query;

  if (action === "delete") {
    todoControllers.removeMany(req, res);
    return;
  }

  if (action === "update") {
    todoControllers.updateMany(req, res);
    return;
  }
  res.sendStatus(400);
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
