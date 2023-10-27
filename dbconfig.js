const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const mysql = require('mysql2')

dotenv.config();


const db = new Sequelize({
  dialect: 'mysql',
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  define: {
    timestamps: false,
  },
});

module.exports = db;

/* Kalau Pakai Mysql2 */
// const db = mysql.createConnection({
//     host: 'localhost',       
//     user: 'root',       
//     password: process.env.DB_PASSWORD, 
//     database: process.env.DB_DATABASE 
//   });   