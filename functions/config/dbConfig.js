const { Sequelize } = require('sequelize');

// const connectDB = new Sequelize('DB_EasyBill', 'ganeshkanna', 'test#123', {
//   host: 'localhost',
//   dialect: 'mssql'
//   /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
// });
const connectDB = new Sequelize('DB_EasyBill', 'sa', 'ZhaC0devps@1', {
  host: '62.72.56.22',
  dialect: 'mssql'
  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});


// MSSQLSERVER
// DESKTOP-6C9532V\Lab
  module.exports = connectDB;