const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 
const db= require('./dbconfig');

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

//Kalau pake Mysql2
// db.connect((err) => {
//   if (err) {
//     console.error('Koneksi database gagal: ' + err.stack);
//     return;
//   }
//   console.log('Terhubung ke database');
// });

db
  .authenticate()
  .then(() => {
    console.log('Koneksi ke database berhasil.');
  })
  .catch((err) => {
    console.error('Gagal terkoneksi ke database:', err);
  });

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});