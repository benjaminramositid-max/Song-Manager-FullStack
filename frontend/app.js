const API_URL = 'https://song-manager-api-i6ej.onrender.com';

let songsList = [];
let editSongModal;

// Toast notifications
const showToast = (message, type = 'success') => {
    const toastEl = document.getElementById('appToast');
    const toastMsg = document.getElementById('appToastMessage');
    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    toastMsg.textContent = message;
    bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3000 }).show();
};

// Fetch all songs
async function fetchSongs() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        songsList = data;
        renderSongs();
        updateSongCount();
    } catch (error) {
        console.error('Error fetching songs:', error);
        showToast('Could not load songs from server', 'danger');
    }
}

// Update counter
const updateSongCount = () => {
    document.getElementById('song-count').textContent = `${songsList.length} song${songsList.length !== 1 ? 's' : ''}`;
};

// Escape HTML
const escapeHtml = (text) => {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

// Format date
const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Render songs
const renderSongs = () => {
    const container = document.getElementById('songs-container');

    if (songsList.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5 text-muted">
                <i class="bi bi-music-note" style="font-size: 3rem;"></i>
                <p class="mt-3">Your playlist is empty. Add your first song!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = songsList.map(song => {
        const genreClass = song.genre ? `genre-${song.genre.replace(/\s+/g, '').replace('&', '')}` : 'genre-Other';
        
        return `
            <div class="card song-card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="flex-grow-1">
                            <h6 class="card-title mb-1">
                                <i class="bi bi-music-note-beamed text-primary"></i>
                                ${escapeHtml(song.title)}
                            </h6>
                            ${song.artist ? `
                                <p class="card-text text-secondary mb-1">
                                    <i class="bi bi-person"></i> ${escapeHtml(song.artist)}
                                </p>
                            ` : ''}
                            <div class="d-flex align-items-center gap-2 mt-2">
                                ${song.genre ? `
                                    <span class="badge genre-badge ${genreClass}">
                                        ${escapeHtml(song.genre)}
                                    </span>
                                ` : ''}
                                <small class="text-muted">Added: ${formatDate(song.created_at)}</small>
                            </div>
                        </div>
                        <div class="btn-group">
                            <button class="btn btn-sm btn-outline-primary" onclick="openEditSongModal(${song.id})">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteSong(${song.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
};

// Open edit modal
window.openEditSongModal = (id) => {
    const song = songsList.find(item => item.id === id);
    if (!song) return;

    document.getElementById('edit-song-id').value = song.id;
    document.getElementById('edit-song-title').value = song.title;
    document.getElementById('edit-song-artist').value = song.artist || '';
    document.getElementById('edit-song-genre').value = song.genre || '';

    editSongModal.show();
};

// Add song
document.getElementById('song-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('song-title').value.trim();
    const artist = document.getElementById('song-artist').value.trim();
    const genre = document.getElementById('song-genre').value;

    if (!title) {
        showToast('Please enter a song title', 'warning');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, artist, genre })
        });

        if (response.ok) {
            await fetchSongs();
            showToast(`"${title}" added to your playlist!`, 'success');
            document.getElementById('song-form').reset();
        } else {
            const data = await response.json();
            showToast(data.error || 'Error adding song', 'danger');
        }
    } catch (error) {
        console.error('Error adding song:', error);
        showToast('Could not connect to server', 'danger');
    }
});

// Delete song
window.deleteSong = async (id) => {
    const song = songsList.find(s => s.id === id);
    
    if (!confirm(`Remove "${song?.title || 'this song'}" from your playlist?`)) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}${id}`, { method: 'DELETE' });

        if (response.ok) {
            await fetchSongs();
            showToast('Song removed from playlist', 'warning');
        } else {
            const data = await response.json();
            showToast(data.error || 'Error deleting song', 'danger');
        }
    } catch (error) {
        console.error('Error deleting song:', error);
        showToast('Could not connect to server', 'danger');
    }
};

// Update song
document.getElementById('edit-song-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('edit-song-id').value;
    const title = document.getElementById('edit-song-title').value.trim();
    const artist = document.getElementById('edit-song-artist').value.trim();
    const genre = document.getElementById('edit-song-genre').value;

    if (!title) {
        showToast('Song title cannot be empty', 'warning');
        return;
    }

    try {
        const response = await fetch(`${API_URL}${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, artist, genre })
        });

        if (response.ok) {
            await fetchSongs();
            editSongModal.hide();
            showToast('Song updated successfully!', 'success');
        } else {
            const data = await response.json();
            showToast(data.error || 'Error updating song', 'danger');
        }
    } catch (error) {
        console.error('Error updating song:', error);
        showToast('Could not connect to server', 'danger');
    }
});

// Initialize
editSongModal = new bootstrap.Modal(document.getElementById('editSongModal'));
fetchSongs();