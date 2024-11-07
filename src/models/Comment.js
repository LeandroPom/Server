const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Comment', {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,    // Clave primaria
      allowNull: false,
      autoIncrement: true, // Se incrementa automáticamente
    },
    content: {
      type: DataTypes.STRING(500), // Limitar a 500 caracteres
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Fecha y hora de creación automática
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false, // Nombre del usuario que hizo el comentario
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Clave foránea, relación con el modelo User
    },
  }, {
    timestamps: false,
    freezeTableName: true,
  });
};
