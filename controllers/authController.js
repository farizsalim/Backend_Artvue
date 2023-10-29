const bcrypt = require('bcrypt');
const db = require('../dbconfig');
const {User} = require('../models/User')

exports.register = async (req, res) => {
  const { fullname, email, password, username, gender, phoneNumber } = req.body;

  try {
    const existingUser = await User.findOne({ 
      where: { Email: email },
      attributes: { exclude: ['id'] },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Pengguna dengan alamat email tersebut sudah terdaftar' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const defaultProfilePicture = './public/image/default.png';

    const newUser = await User.create({
      FullName: fullname,
      Email: email,
      Password: hashedPassword,
      Username: username,
      Gender: gender,
      PhoneNumber: phoneNumber,
      ProfilePicture: defaultProfilePicture,
    });

    res.json({ message: 'Registrasi berhasil' });
  } catch (error) {
    console.error('Gagal melakukan registrasi: ' + error);
    res.status(500).json({ error: 'Gagal melakukan registrasi' });
  }
};


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

exports.updateUsername = async (req, res) => {
  const { IDUser } = req.params; 
  const { newUsername } = req.body; 
  
  try {
    const user = await User.findByPk(IDUser);
    
    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }
    
    user.Username = newUsername;
    
    await user.save();
    
    res.json({ message: 'Username berhasil diperbarui' });
  } catch (error) {
    console.error('Gagal memperbarui username pengguna: ' + error);
    res.status(500).json({ error: 'Gagal memperbarui username pengguna' });
  }
};

exports.deleteUser = async (req, res) => {
  const { IDUser } = req.params;
  
  try {
    const user = await User.findByPk(IDUser);
    
    if (!user) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }
    
    await user.destroy();
    
    res.json({ message: 'Pengguna berhasil dihapus' });
  } catch (error) {
    console.error('Gagal menghapus pengguna: ' + error);
    res.status(500).json({ error: 'Gagal menghapus pengguna' });
  }
};