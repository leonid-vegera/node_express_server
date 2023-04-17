'use strict';

import * as todoControllers from '../controllers/todos.js';
import express from 'express';

export const router = express.Router();

router.get('/', todoControllers.getAll);

router.get('/:todoId', todoControllers.getOne);

router.post('/', todoControllers.add);

router.delete('/:todoId', todoControllers.remove);

router.put('/:todoId', todoControllers.update);

router.patch('/', (req, res) => {
  const { action } = req.query;

  if (action === 'delete') {
    todoControllers.removeMany(req, res);
    return;
  }

  if (action === 'update') {
    todoControllers.updateMany(req, res);
    return;
  }
  res.sendStatus(400);
});
