const { Tag, User } = require('../../db');


module.exports = async (tagName, userId) => {
    
    // Función para validar el nombre de la etiqueta
    const validateTagName = (tagName) => {
        const specialCharPattern = /[^a-zA-Z0-9\s]/; // Solo permite letras, números y espacios
        if (specialCharPattern.test(tagName)) {
            throw new Error(`Invalid characters in tag name: "${tagName}"`);
        }
    
        if (tagName.length > 120) {
            throw new Error(`Tag name "${tagName}" exceeds the 120 character limit`);
        }
    };

    try {
        // Verificar que el usuario tenga los roles necesarios
        const user = await User.findByPk(userId);
        if (!user || (user.role !== 'administrator' && user.role !== 'editor')) {
            throw new Error('User does not have permission to create or modify tags');
        }

        // Validar el nombre de la etiqueta
        validateTagName(tagName);

        // Crear o encontrar la etiqueta
        const [newTag, created] = await Tag.findOrCreate({
            where: { tag_name: tagName },
            defaults: {
                tag_name: tagName
            }
        });

        if (!created) {
            throw new Error(`Tag "${tagName}" already exists`);
        }

        console.log("new tag created")
        // Devolver solo tag_id y tag_name
        return {
            tag_id: newTag.tag_id,
            tag_name: newTag.tag_name
        };

    } catch (error) {
        // Devolver el mensaje de error para el handler
        throw new Error(error.message);
    }
};
