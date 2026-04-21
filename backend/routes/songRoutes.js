const express = require('express');
const {
    getAllSongs,
    getSongById,
    createSong,
    updateSong,
    deleteSong
} = require('../controllers/songsController');
const {
    validateId,
    validateSongBody
} = require('../middlewares/songValidation');

const router = express.Router();

router.get('/', getAllSongs);
router.get('/:id', validateId, getSongById);
router.post('/', validateSongBody, createSong);
router.put('/:id', validateId, validateSongBody, updateSong);
router.delete('/:id', validateId, deleteSong);

module.exports = router;