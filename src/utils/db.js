/* This is Client */

// import pkg from 'pg';
// const { Client } = pkg;
//
// export const client = new Client({
//   host: 'localhost',
//   user: 'postgres',
//   password: '140781',
// });
// await client.connect();

/* This is Sequelize */

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres', 'postgres', '140781', {
  host: 'localhost',
  dialect: 'postgres',
});
