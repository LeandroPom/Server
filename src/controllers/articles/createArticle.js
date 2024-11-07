const { Article, Tag, User } = require('../../db'); 

module.exports = async (title, byline, content, tags, authorId, status = 'draft', imageUrl = null) => {
  
  // Verificar si el usuario que crea el artículo existe y tiene permisos
  const user = await User.findOne({
    where: { user_id: authorId, role: ['administrator', 'editor'] }
  });

  if (!user) {
    throw new Error('El usuario no existe o no tiene permisos para crear artículos.');
  }

  // Asegurarse de que `tags` sea un arreglo de palabras
  if (typeof tags === 'string') {
    tags = [tags]; // Convierte la cadena en un arreglo con un solo elemento
  }

  // Verificar y manejar las etiquetas (tags) evitando duplicados
  const tagInstances = [];
  for (let tagName of tags) {
    tagName = tagName.charAt(0).toUpperCase() + tagName.slice(1).toLowerCase(); // Normalizar el nombre
    const [tag] = await Tag.findOrCreate({
      where: { tag_name: tagName }
    });
    tagInstances.push(tag);
  }
  console.log(tagInstances)
  
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
  
  // Normalizar y validar el estado
  if (!['published', 'draft', 'archived'].includes(status)) {
    status = 'draft';  // Cambiar a 'draft' de forma silenciosa si el estado es inválido
    console.log(`Status ajustado a 'draft' automáticamente.`);
  }


  // Crear el nuevo artículo
  const newArticle = await Article.create({
    title,
    byline,
    content,
    status,
    author: user.dataValues.name,
    imageUrl  // Por defecto es null, pero puedes pasar una URL de imagen
  });

  // Asociar las etiquetas al artículo
  await newArticle.addTags(tagInstances);

  // Formatear y devolver el artículo creado
  return {
    title: newArticle.title,
    byline: newArticle.byline,
    imageUrl: newArticle.imageUrl,
    content: newArticle.content,
    status: newArticle.status,
    tags: tagInstances.map(tag => tag.tag_name),
    author: user.dataValues.name
  };
};
