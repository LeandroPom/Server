require("dotenv").config(); 
const fs = require('fs');
const path = require('path');
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, NODE_ENV } = process.env;
const { Sequelize } = require("sequelize");

// Configuración para desarrollo y producción
const sequelize = NODE_ENV === "production"
  ? new Sequelize({
      database: DB_NAME,
      username: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
      native: false,
    })
  : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
      logging: false,
      native: false,
    });
// Configura la conexión a la base de datos con Sequelize. Si el entorno es "producción", se configuran opciones adicionales para la conexión segura (SSL). En desarrollo, la conexión es más simple.

const basename = path.basename(__filename);
// Obtiene el nombre del archivo actual para evitar incluirlo luego al cargar modelos

const modelDefiners = [];
// Arreglo donde se almacenarán las definiciones de modelos (archivos .js)

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });
// Lee todos los archivos en la carpeta 'models' y carga aquellos que no empiezan con un punto (.) y que sean archivos .js. Luego, los añade al arreglo modelDefiners.

modelDefiners.forEach(model => model(sequelize));
// Itera sobre todos los modelos cargados y los define en la instancia de sequelize

const { User, Article, Comment, Like, Vote, Tag } = sequelize.models;
// Extrae los modelos definidos dentro de Sequelize

// Relacionar los modelos en la base de datos
User.belongsToMany(Article, {through:'user_article' });
Article.belongsTo(User, {through:'user_article' });
// Un usuario puede tener muchos artículos y un artículo pertenece a un usuario

Article.belongsToMany(Comment, {through:'article_comment' });
Comment.belongsTo(Article, {through:'article_comment' });
// Un artículo puede tener muchos comentarios y un comentario pertenece a un artículo

User.belongsToMany(Comment, {through:'user_comment' });
Comment.belongsTo(User, {through:'user_comment' });
// Un usuario puede tener muchos comentarios y un comentario pertenece a un usuario

Article.belongsToMany(Like, {through:'article_like' });
Like.belongsTo(Article, {through:'article_like' });
// Un artículo puede tener muchos "likes" y un "like" pertenece a un artículo

User.belongsToMany(Like, {through:'user_like' });
Like.belongsTo(User, {through:'user_like' });
// Un usuario puede dar muchos "likes" y un "like" pertenece a un usuario

Article.belongsToMany(Vote, {through:'article_vote' });
Vote.belongsTo(Article, {through:'article_vote' });
// Un artículo puede tener muchos "votos" y un voto pertenece a un artículo

User.belongsToMany(Vote, {through:'user_vote' });
Vote.belongsTo(User, {through:'user_vote' });
// Un usuario puede dar muchos votos y un voto pertenece a un usuario

Tag.belongsToMany(Article, {through: 'article_tag'});
Article.belongsToMany(Tag, {through: 'article_tag'});
// Un articulo puede tener mucbelongsTo tag y una tag pertenece a muchos artículos

module.exports = {
  ...sequelize.models, // Exporta todos los modelos creados en Sequelize
  conn: sequelize,     // Exporta la conexión a la base de datos
};
