const db = require('../config/db');

const getDatabaseErrorMessage = (error) => {
    return error.message || error.code || error.sqlMessage || 'Database error';
};

const getAllSongs = async (req, res) => {
    try {
        const [songs] = await db.query('SELECT * FROM songs ORDER BY created_at DESC');
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

const getSongById = async (req, res) => {
    const { id } = req.params;
    try {
        const [songs] = await db.query('SELECT * FROM songs WHERE id = ?', [id]);
        if (songs.length === 0) {
            return res.status(404).json({ error: `Song with id ${id} not found.` });
        }
        res.json(songs[0]);
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

const createSong = async (req, res) => {
    const { title, artist, genre } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO songs(title, artist, genre) VALUES(?, ?, ?)',
            [title.trim(), artist ? artist.trim() : null, genre || null]
        );
        res.status(201).json({
            id: result.insertId,
            title: title.trim(),
            artist: artist ? artist.trim() : null,
            genre: genre || null
        });
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

const updateSong = async (req, res) => {
    const { id } = req.params;
    const { title, artist, genre } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE songs SET title = ?, artist = ?, genre = ? WHERE id = ?',
            [title.trim(), artist ? artist.trim() : null, genre || null, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `Song with id ${id} not found.` });
        }
        res.json({ id: Number(id), title: title.trim(), artist: artist ? artist.trim() : null, genre: genre || null });
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

const deleteSong = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM songs WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `Song with id ${id} not found.` });
        }
        res.json({ message: `Song with id ${id} deleted` });
    } catch (error) {
        res.status(500).json({ error: getDatabaseErrorMessage(error) });
    }
};

module.exports = {
    getAllSongs,
    getSongById,
    createSong,
    updateSong,
    deleteSong
};