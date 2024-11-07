const createArticle = require('../../controllers/articles/createArticle');

module.exports = async (req, res) => {
  const { 
    title, 
    byline, 
    content, 
    tags, 
    authorId, 
    status, 
    imageUrl 
  } = req.body;

  try {
    // Llamamos al controller para crear el artículo
    const newArticle = await createArticle(
      title,
      byline,
      content,
      tags,
      authorId,
      status,
      imageUrl
    );

    // Si se crea correctamente, devolvemos un status 201
    return res.status(201).json(newArticle);
    
  } catch (error) {
    // Si ocurre un error específico, como un título duplicado, devolvemos un error 409 (conflict)
    if (error.message.includes('título del artículo ya existe')) {
      return res.status(409).json({ error: error.message });
    }

    // Para otros errores, devolvemos un error 400 con el mensaje correspondiente
    return res.status(400).json({ error: error.message });
  }
};
