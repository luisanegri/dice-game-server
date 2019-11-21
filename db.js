const Sequelize = require('sequelize');
const databaseURL =
  process.env.DATABASE_URL ||
  'postgres://postgres:6772@localhost:5432/postgres';

const db = new Sequelize(databaseURL);

db.sync({ force: false })
  .then(() => console.log('Database has been updated'))
  .catch(console.error);

module.exports = db;
