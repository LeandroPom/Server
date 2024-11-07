const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Vote', {
    vote_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,  // Se incrementa automáticamente
      primaryKey: true,     // Clave primaria
    },
    value: {
      type: DataTypes.ENUM('up', 'down'),  // Solo valores 'up' o 'down'
      allowNull: false,  // Obligatorio definir el tipo de voto
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Clave foránea: el usuario que emitió el voto
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Clave foránea: el artículo en el que se emitió el voto
    },
    voteDate: {
      type: DataTypes.DATE,
      allowNull: false,  // Fecha en que se emitió el voto
      defaultValue: DataTypes.NOW,  // Se genera automáticamente la fecha del voto
    },
  }, {
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        unique: true,  // Un voto único por usuario y artículo
        fields: ['userId', 'articleId'],
      }
    ]
  });

//   // Métodos personalizados para contar votos
//   sequelize.models.Article.prototype.countUpvotes = async function () {
//     return await sequelize.models.Vote.count({
//       where: { articleId: this.id, value: 'up' }
//     });
//   };

//   sequelize.models.Article.prototype.countDownvotes = async function () {
//     return await sequelize.models.Vote.count({
//       where: { articleId: this.id, value: 'down' }
//     });
//   };
};
