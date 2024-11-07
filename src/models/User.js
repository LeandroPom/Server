const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Definir el modelo User
  sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // El correo electrónico debe ser único
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100], // Longitud mínima de 6 caracteres
          msg: "La contraseña debe tener al menos 6 caracteres",
        },
        is: {
          args: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, // Al menos una letra y un número
          msg: "La contraseña debe contener al menos una letra y un número",
        },
      },
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Generar automáticamente la fecha de registro
    },
    profileFoto: {
      type: DataTypes.STRING,
      allowNull: true, // Campo opcional para la foto de perfil
    },
    role: {
      type: DataTypes.ENUM('administrator', 'editor', 'user', 'viewer'),
      allowNull: false,
      defaultValue: 'user', // Valor por defecto para nuevos usuarios
    },
    status: {
      type: DataTypes.ENUM('active', 'suspended', 'deleted'),
      allowNull: false,
      defaultValue: 'active', // Valor por defecto "active" para nuevos usuarios
    },
  }, {
    timestamps: false, // Evitar que Sequelize cree automáticamente los campos `createdAt` y `updatedAt`
    freezeTableName: true, // El nombre de la tabla será igual al modelo definido (User)
  });
};
