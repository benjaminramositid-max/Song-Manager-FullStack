const express = require('express');
const cors = require('cors');
const songRoutes = require('./routes/songRoutes');

const app = express();

app.use(cors({
    origin: ['http://localhost:8080', 'https://song-manager-fullstack.vercel.app', 'https://song-manager-frontend.vercel.app'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: '🎵 Song Manager API is running!' });
});

app.use('/api/songs', songRoutes);

module.exports = app;