const getAllArticles = require('../../controllers/articles/getAllArticles');

module.exports = async (req, res) => {
    try {
        // Llama al controller que trae todos los artículos
        const articles = await getAllArticles();

        // Si se encontraron artículos, responde con un status 200 y los artículos
        res.status(200).json(articles);
    } catch (error) {
        // En caso de error, responde con un status 400 y el mensaje de error
        res.status(400).json(error.message);
    }
};
