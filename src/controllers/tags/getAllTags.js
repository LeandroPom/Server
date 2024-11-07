const { Tag } = require('../../db');

module.exports = async () => {
    // Busca todas las tags en la base de datos
    const allTags = await Tag.findAll();

    if (allTags.length) {
        return allTags;
    }

    // Retorna un mensaje si no hay tags
    throw new Error('No hay tags disponibles');
};
