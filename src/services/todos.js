'use strict';

import { Todo } from '../models/Todo.js';
import { sequelize } from '../utils/db.js';
import { Op, QueryTypes } from 'sequelize';

export function normalize({ id, title, completed }) {
  return { id, title, completed };
}

export async function getAll() {
  return await Todo.findAll({
    order: [['created_at', 'ASC']],
  });
}

export function getById(todoId) {
  return Todo.findByPk(todoId);
}

export async function creat(title) {
  return Todo.create({ title });
}

export async function update({ id, title, completed }) {
  return await Todo.update(
    { title, completed },
    {
      where: {
        id: id,
      },
    }
  );
}

export async function updateMany(todos) {
  const t = await sequelize.transaction();

  try {
    for (const { id, title, completed } of todos) {
      await Todo.update(
        { title, completed },
        {
          where: {
            id: id,
          },
          transaction: t,
        }
      );
    }

    t.commit();
  } catch (error) {
    t.rollback();
  }
}

export async function remove(todoId) {
  return await Todo.destroy({
    where: {
      id: todoId,
    },
  });
}

export async function removeMany(ids) {
  /* можно так */
  return Todo.destroy({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });

  /*  а можно так */
  // return sequelize.query(`DELETE FROM todos WHERE id IN (:ids)`, {
  //   replacements: { ids: ids },
  //   type: QueryTypes.BULKDELETE,
  // });
}
