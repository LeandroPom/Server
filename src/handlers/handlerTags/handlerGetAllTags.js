const getAllTags = require('../../controllers/tags/getAllTags');

module.exports = async (req, res) => {
    try {
        const tags = await getAllTags();
        res.status(200).json(tags);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
