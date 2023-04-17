'use strict';

import * as todoServices from '../services/todos.js';

export function getAll(req, res) {
  const todos = todoServices.getAll();
  res.send(todos);
}

export function getOne(req, res) {
  const { todoId } = req.params;
  const foundTodo = todoServices.getById(todoId);
  if (!foundTodo) {
    res.sendStatus(404);
    return;
  }
  res.send(foundTodo);
}

export function add(req, res) {
  const { title } = req.body;

  if (!title) {
    res.sendStatus(422);
    return;
  }

  const newTodo = todoServices.creat(title);

  res.statusCode = 201;
  res.send(newTodo);
}

export function remove(req, res) {
  const { todoId } = req.params;
  const foundTodo = todoServices.getById(todoId);

  if (!foundTodo) {
    res.sendStatus(404);
    return;
  }

  todoServices.remove(todoId);
  res.sendStatus(204);
}

export const update = (req, res) => {
  const { todoId } = req.params;
  const foundTodo = todoServices.getById(todoId);

  if (!foundTodo) {
    res.sendStatus(404);
    return;
  }

  const { title, completed } = req.body;

  if (typeof title !== 'string' || typeof completed !== 'boolean') {
    res.sendStatus(422);
    return;
  }

  const todo = todoServices.update({ id: todoId, completed, title });
  res.send(todo);
};

export const removeMany = (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    res.sendStatus(422);
    return;
  }

  try {
    todoServices.removeMany(ids);
  } catch (err) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
};

export const updateMany = (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    res.sendStatus(422);
    return;
  }

  const results = [];
  const errors = [];

  for (const { id, title, completed } of items) {
    const foundTodo = todoServices.getById(id);
    if (foundTodo) {
      todoServices.update({ id, title, completed });
      results.push({ id, status: 'OK' });
    } else {
      errors.push({ id, status: 'Not found' });
    }
  }
  res.send({ results, errors });
};
