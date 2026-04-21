-- Create database
CREATE DATABASE IF NOT EXISTS song_manager;

-- Use database
USE song_manager;

-- Create songs table
CREATE TABLE IF NOT EXISTS songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255),
    genre VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample songs
INSERT INTO songs (title, artist, genre) VALUES
('Bohemian Rhapsody', 'Queen', 'Rock'),
('Billie Jean', 'Michael Jackson', 'Pop'),
('Shape of You', 'Ed Sheeran', 'Pop'),
('Hotel California', 'Eagles', 'Rock'),
('Lose Yourself', 'Eminem', 'Hip Hop');