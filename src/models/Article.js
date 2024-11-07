const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Article', {
    article_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,    // Clave primaria
      allowNull: false,
      autoIncrement: true, // Se incrementa automáticamente
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    byline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING, // Para almacenar la URL de Firebase
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT, // Permite una gran extensión de texto
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Lista de etiquetas para intereses/categorías
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived', 'deleted'),
      allowNull: false,
      defaultValue: 'draft', // Por defecto, el artículo se guarda como borrador
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Fecha y hora de publicación se generan automáticamente
    },
    author: {
      type: DataTypes.STRING, // Nombre del autor que realizó el post
      allowNull: false,
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  });
};
