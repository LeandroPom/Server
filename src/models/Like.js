const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Like', {
    like_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,  // Se incrementa automáticamente
      primaryKey: true,     // Clave primaria
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,      // Clave foránea: el usuario que dio el "like"
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,      // Clave foránea: el artículo que recibió el "like"
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        unique: true,        // Limita un solo "like" por usuario en cada artículo
        fields: ['userId', 'articleId'],
      }
    ]
  });
};
