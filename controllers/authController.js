const bcrypt = require('bcrypt');
const db = require('../dbconfig');
const {User} = require('../models/User')

exports.register = async (req, res) => {
  const { fullname, email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ 
      where: { Email: email },
      attributes: { exclude: ['id'] },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Pengguna dengan alamat email tersebut sudah terdaftar' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({
      FullName: fullname,
      Email: email,
      Password: hashedPassword,
      Username: username,
    });

    res.json({ message: 'Registrasi berhasil' });
  } catch (error) {
    console.error('Gagal melakukan registrasi: ' + error);
    res.status(500).json({ error: 'Gagal melakukan registrasi' });
  }
};

/*Kalau Pakai mysql2*/
// if (!fullname || !email || !password || !username) {
//   return res.status(400).json({ error: 'Nama lengkap, email, kata sandi, dan username wajib diisi' });
// }

// const query = 'SELECT * FROM Users WHERE Email = ?';
// db.query(query, [email], (err, results) => {
//   if (err) {
//     console.error('Gagal memeriksa pengguna terdaftar: ' + err);
//     return res.status(500).json({ error: 'Gagal memeriksa pengguna terdaftar' });
//   }

//   if (results.length > 0) {
//     return res.status(400).json({ error: 'Pengguna dengan alamat email tersebut sudah terdaftar' });
//   }

//   const hashedPassword = bcrypt.hashSync(password, 10);

//   const insertQuery = 'INSERT INTO Users (FullName, Email, Password, Username) VALUES (?, ?, ?, ?)';
//   db.query(insertQuery, [fullname, email, hashedPassword, username], (insertErr, insertResults) => {
//     if (insertErr) {
//       console.error('Gagal menambahkan pengguna ke database: ' + insertErr);
//       return res.status(500).json({ error: 'Gagal menambahkan pengguna' });
//     }
//     res.json({ message: 'Registrasi berhasil' });
//   });
// });

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users || users.length === 0) {
      return res.status(404).json({ error: 'Tidak ada pengguna yang ditemukan' });
    }

    res.json(users);
  } catch (error) {
    console.error('Gagal mengambil pengguna: ' + error);
    res.status(500).json({ error: 'Gagal mengambil pengguna' });
  }
};