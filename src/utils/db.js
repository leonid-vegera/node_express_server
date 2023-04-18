import pkg from 'pg';

const { Client } = pkg;

export const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '140781',
});
await client.connect();
