const music = new Audio();
const songs = [
    { id: '1', songName: 'sokuladi chitamma', artist: 'Magali', poster: 'assets/images/img4.jpg', src: 'audio/avara.mp3' },
    { id: '2', songName: 'Kanlio', artist: 'shailaga', poster: 'assets/images/img3.jpg', src: 'audio/chiru.mp3' },
    { id: '3', songName: 'Chiru', artist: 'Sunitha', poster: 'assets/images/img6.jpg', src: 'assets/audio/kanilo.mp3' },
];

document.addEventListener('DOMContentLoaded', () => {
    loadSongs();
    setupEventListeners();
});

function loadSongs() {
    const songContainer = document.querySelector('.grid');
    songs.forEach((song) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${song.poster}" alt="${song.songName}">
            <h3>${song.songName}</h3>
            <p>${song.artist}</p>
            <button class="play-btn" data-id="${song.id}"><i class="fas fa-play"></i> Play</button>
            <button class="download-btn" data-src="${song.src}"><i class="fas fa-download"></i> Download</button>
        `;
        songContainer.appendChild(card);
    });
}

function setupEventListeners() {
    const playButtons = document.querySelectorAll('.play-btn');
    const downloadButtons = document.querySelectorAll('.download-btn');
    const masterPlayButton = document.getElementById('masterPlay');
    const backButton = document.getElementById('back');
    const nextButton = document.getElementById('next');
    const seekBar = document.getElementById('seek');
    const volumeControl = document.getElementById('vol');

    playButtons.forEach(button => {
        button.addEventListener('click', playSong);
    });

    downloadButtons.forEach(button => {
        button.addEventListener('click', downloadSong);
    });

    masterPlayButton.addEventListener('click', togglePlayPause);
    backButton.addEventListener('click', playPrevious);
    nextButton.addEventListener('click', playNext);
    seekBar.addEventListener('change', seekSong);
    volumeControl.addEventListener('change', adjustVolume);

    music.addEventListener('timeupdate', updateProgressBar);
    music.addEventListener('ended', songEnded);
}

function playSong(event) {
    const songId = event.target.closest('.play-btn').dataset.id;
    const song = songs.find(s => s.id === songId);
    music.src = song.src;
    document.getElementById('poster_master_play').src = song.poster;
    document.getElementById('title').innerText = `${song.songName} - ${song.artist}`;
    music.play();
    updatePlayPauseButton();
    highlightCurrentSong(songId);
}

function togglePlayPause() {
    if (music.paused || music.currentTime <= 0) {
        music.play();
    } else {
        music.pause();
    }
    updatePlayPauseButton();
}

function playPrevious() {
    let currentSongIndex = songs.findIndex(song => song.src === music.src);
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSongByIndex(currentSongIndex);
}

function playNext() {
    let currentSongIndex = songs.findIndex(song => song.src === music.src);
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSongByIndex(currentSongIndex);
}

function playSongByIndex(index) {
    const song = songs[index];
    music.src = song.src;
    document.getElementById('poster_master_play').src = song.poster;
    document.getElementById('title').innerText = `${song.songName} - ${song.artist}`;
    music.play();
    updatePlayPauseButton();
    highlightCurrentSong(song.id);
}

function seekSong() {
    music.currentTime = (seek.value / 100) * music.duration;
}

function adjustVolume() {
    music.volume = vol.value / 100;
    updateVolumeIcon();
}

function updateVolumeIcon() {
    const volIcon = document.getElementById('vol_icon');
    if (vol.value == 0) {
        volIcon.classList.remove('fa-volume-down', 'fa-volume-up');
        volIcon.classList.add('fa-volume-mute');
    } else if (vol.value > 0 && vol.value <= 50) {
        volIcon.classList.remove('fa-volume-mute', 'fa-volume-up');
        volIcon.classList.add('fa-volume-down');
    } else {
        volIcon.classList.remove('fa-volume-mute', 'fa-volume-down');
        volIcon.classList.add('fa-volume-up');
    }
}

function updatePlayPauseButton() {
    const masterPlayButton = document.getElementById('masterPlay');
    if (music.paused || music.currentTime <= 0) {
        masterPlayButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        masterPlayButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function updateProgressBar() {
    const seekBar = document.getElementById('seek');
    const currentStart = document.getElementById('currentStart');
    const currentEnd = document.getElementById('currentEnd');
    const progress = (music.currentTime / music.duration) * 100;
    seekBar.value = progress;

    const currentMinutes = Math.floor(music.currentTime / 60);
    const currentSeconds = Math.floor(music.currentTime % 60);
    currentStart.innerText = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    const totalMinutes = Math.floor(music.duration / 60);
    const totalSeconds = Math.floor(music.duration % 60);
    currentEnd.innerText = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
}

function songEnded() {
    playNext();
}

function highlightCurrentSong(songId) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (card.querySelector('.play-btn').dataset.id === songId) {
            card.style.backgroundColor = 'rgba(105, 105, 170, 0.1)';
        } else {
            card.style.backgroundColor = '';
        }
    });
}

function downloadSong(event) {
    const songSrc = event.target.closest('.download-btn').dataset.src;
    const link = document.createElement('a');
    link.href = songSrc;
    link.download = songSrc.split('/').pop();
    link.click();
}
