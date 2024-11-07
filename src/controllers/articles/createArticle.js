const { Article, Tag, User } = require('../../db'); 

module.exports = async (title, byline, content, tags, authorId, status = 'draft', imageUrl = null) => {

  // Verificar si el usuario que crea el artículo existe y tiene permisos
  const user = await User.findOne({
    where: { user_id: authorId, role: ['administrator', 'editor'] }
  });

  const data =user.dataValues
  console.log('esto es user: ', data)

  if (!user) {
    throw new Error('El usuario no existe o no tiene permisos para crear artículos.');
  }

  // Validación del título para evitar duplicados
  const existingArticle = await Article.findOne({ where: { title } });
  if (existingArticle) {
    throw new Error('El título del artículo ya existe, por favor elija otro.');
  }

  // Validación del contenido según el estado (draft o published)
  if (status === 'published' && content.length < 300) {
    throw new Error('Un artículo debe tener al menos 300 caracteres para ser publicado.');
  }

  if (status === 'draft' && content.length < 4) {
    throw new Error('Un artículo en borrador debe tener al menos 4 caracteres.');
  }

  // Verificar y manejar las etiquetas (tags)
  const tagInstances = [];
  for (let tagName of tags) {
    const [tag, created] = await Tag.findOrCreate({
      where: { tag_name: tagName.charAt(0).toUpperCase() + tagName.slice(1).toLowerCase() }
    });
    tagInstances.push(tag);
  }

  // Crear el nuevo artículo
  const newArticle = await Article.create({
    title,
    byline,
    content,
    status,
    authorId: [data].name,
    imageUrl,  // Por defecto es null, pero puedes pasar una URL de imagen
  });

  // Asociar las etiquetas al artículo
  console.log('esto es newArticle: ', newArticle)
  await newArticle.addTags(tagInstances);

  // Formatear y devolver el artículo creado
  return {
    title: newArticle.title,
    byline: newArticle.byline,
    imageUrl: newArticle.imageUrl,
    content: newArticle.content,
    status: newArticle.status,
    tags: tagInstances.map(tag => tag.tag_name),
    author: [data].name
  };
};
