const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const mysql = require('mysql2')

dotenv.config();

const db = new Sequelize({
  dialect: 'mysql',
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  define: {
    timestamps: false,
  },
});


module.exports = db;