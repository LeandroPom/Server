const { Article } = require('../../db');

module.exports = async () => {
  // Busca todos los artículos en la base de datos
  const allArticles = await Article.findAll();

  // Verifica si hay artículos
  if (allArticles.length) {
    return allArticles;
  }
  
  // Si no hay artículos, devuelve un mensaje de error
  return console.log('No hay artículos disponibles');
};
