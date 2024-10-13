const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

const envPath = `C:/Users/Willis/Desktop/Create with Code/MoshClub/moshClubBackEnd/env.${ENV}`;
console.log(envPath)

console.log(`Connecting to the ${ENV} environment!`)

require('dotenv').config({
  path: envPath,
});
console.log(process.env.PGDATABASE)
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE or PGDATABASE_URL not set');
}

module.exports = new Pool();