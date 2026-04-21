const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: 'The "id" parameter must be a positive integer.'
        });
    }

    next();
};

const validateSongBody = (req, res, next) => {
    const { title } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
            error: 'The "title" field is required and cannot be empty.'
        });
    }

    next();
};

module.exports = {
    validateId,
    validateSongBody
};