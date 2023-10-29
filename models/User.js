const { DataTypes } = require('sequelize');
const db = require('../dbconfig');

const User = db.define('users', {
    IDUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FullName: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
    },
    Password: {
      type: DataTypes.STRING,
    },
    Username: {
      type: DataTypes.STRING,
    },
    Gender: {
      type: DataTypes.STRING,
    },
    ProfilePicture: {
      type: DataTypes.STRING,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
});

User.sync();

module.exports = {User};
