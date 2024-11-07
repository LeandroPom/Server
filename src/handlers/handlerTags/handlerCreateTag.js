const createTag = require('../../controllers/tags/createTag');

module.exports = async (req, res) => {

    const { tag_name, userId } = req.body;

    try {
        // Llamar al controller para crear la etiqueta
        const newTag = await createTag(tag_name, userId);

        return res.status(201).json(newTag);

    } catch (error) {
        if (error.message.includes('already exists')) {
            return res.status(409).json({ error: error.message });
        } else {
            return res.status(400).json({ error: error.message });
        }
    }
};
