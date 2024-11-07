const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Definir el modelo Tag
  sequelize.define('Tag', {
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Genera automáticamente el ID
      allowNull: false
    },
    tag_name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
      set(value) {
        // Almacenar siempre con la primera letra en mayúscula
        this.setDataValue('tag_name', value.charAt(0).toUpperCase() + value.slice(1).toLowerCase());
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  });
};
