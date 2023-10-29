const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); 
const db= require('./dbconfig');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 8000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
const router = require('./routes/routes');
app.use(router)

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