'use strict';

import * as todoServices from '../services/todos.js';

export async function getAll(req, res) {
  const todos = await todoServices.getAll();
  res.send(todos.map(todoServices.normalize));
}

export async function getOne(req, res) {
  const { todoId } = req.params;
  const foundTodo = await todoServices.getById(todoId);
  if (!foundTodo) {
    res.sendStatus(404);
    return;
  }
  res.send(todoServices.normalize(foundTodo));
}

export async function add(req, res) {
  const { title } = req.body;

  if (!title) {
    res.sendStatus(422);
    return;
  }

  const newTodo = await todoServices.creat(title);

  res.statusCode = 201;
  res.send(newTodo);
}

export const update = async (req, res) => {
  const { todoId } = req.params;

  /* redundant in sequelize */
  // const foundTodo = await todoServices.getById(todoId);
  // if (!foundTodo) {
  //   res.sendStatus(404);
  //   return;
  // }

  const { title, completed } = req.body;

  if (typeof title !== 'string' || typeof completed !== 'boolean') {
    res.sendStatus(422);
    return;
  }

  await todoServices.update({ id: todoId, completed, title });

  const updatedTodo = todoServices.getById(todoId);

  res.send(updatedTodo);
};

export const updateMany = async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    res.sendStatus(422);
    return;
  }

  /* можно так */
  // const results = [];
  // const errors = [];
  //
  // for (const { id, title, completed } of items) {
  //   const foundTodo = await todoServices.getById(id);
  //   if (foundTodo) {
  //     await todoServices.update({ id, title, completed });
  //     results.push({ id, status: 'OK' });
  //   } else {
  //     errors.push({ id, status: 'Not found' });
  //   }
  // }
  // res.send({ results, errors });

  /* а можно и так */
  await todoServices.updateMany(items);
  res.sendStatus(200);
};

export async function remove(req, res) {
  const { todoId } = req.params;
  const foundTodo = await todoServices.getById(todoId);

  if (!foundTodo) {
    res.sendStatus(404);
    return;
  }

  await todoServices.remove(todoId);
  res.sendStatus(204);
}

export const removeMany = async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    res.sendStatus(422);
    return;
  }

  try {
    await todoServices.removeMany(ids);
  } catch (err) {
    res.sendStatus(404);
    return;
  }
  res.sendStatus(204);
};
