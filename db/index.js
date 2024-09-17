const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

const envPath = `${__dirname}/../.env.${ENV}`;

console.log(__dirname)
console.log(envPath)

require('dotenv').config({
  path: envPath,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or PGDATABASE_URL not set');
}

module.exports = new Pool();