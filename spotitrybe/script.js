const CLIENT_ID = 'a7ff242868b3438b894af781a9c75ed9';
const CLIENT_SECRET = '8d60281df47e4b29ba8d2c5608c2139c';
let token;

const getToken = async () => {
    const requestInfo = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', 
            Authorization: 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        },
        body: 'grant_type=client_credentials' 
    };
    const response = await fetch('https://accounts.spotify.com/api/token', requestInfo);
    const data = await response.json();
    return data.access_token;   
}

const getGenres = async (token) => {
    const requestInfo = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const url = 'https://api.spotify.com/v1/browse/categories?locale=pt-br'
    const response = await fetch(url, requestInfo);
    const data = await response.json();
    return data.categories.items;
}

const getPlaylists = async (token, genreId) => {
    const requestInfo = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const url = `https://api.spotify.com/v1/browse/categories/${genreId}/playlists`
    const response = await fetch(url, requestInfo);
    const data = await response.json();
    return data.playlists.items;
}

const getTracks = async (token, playlistId) => {
    const requestInfo = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    const response = await fetch(url, requestInfo);
    const data = await response.json();
    // console.log(data.items)
    return data.items;
}

// helpers

const getElementOrClosest = (sectionClass, target) => 
    target.classList.contains(sectionClass)
    ? target
    : target.closest(sectionClass);

const clearSelectedItem = (containerSelector) => {
    const element = document.querySelector(`${containerSelector} .item-selected`);
    if (element) {
    element.classList.remove('item-selected');
    }
};

const clearPlaylists = () => {
    const element = document.querySelector('.playlist-cards');
    element.innerHTML = '';
};

const clearTracks = () => {
    const element = document.querySelector('.tracks-cards');
    element.innerHTML = '';
};

// handlers

const handleGenreCardClick = async ({ target }) => {
    const genreSection = getElementOrClosest('.genre', target);
    const id = genreSection.id;
    clearSelectedItem('.genre-cards');
    genreSection.classList.add('item-selected');
    const playlists = await getPlaylists(token, id);
    clearPlaylists();
    renderPlaylists(playlists);
}

const handlePlaylistCardClick = async ({ target }) => {
    const playlistSection = getElementOrClosest('.playlist', target);
    const id = playlistSection.id;
    clearSelectedItem('.playlist-cards');
    playlistSection.classList.add('item-selected');

    const tracks = await getTracks(token, id);
    clearTracks();
    renderTracks(tracks);
}

const handleTrackCardClick = async ({ target }) => {
    const trackSection = getElementOrClosest('.track', target);
    const id = trackSection.id;
    clearSelectedItem('.tracks-cards');
    trackSection.classList.add('item-selected');

    const player = document.querySelector('#player');
    if (player) {
        player.querySelector('source').src = trackSection.value
        player.load();
    } else {
        createPlayer(trackSection.value);
    }
    console.log(trackSection.value)
    document.querySelector('#play').innerHTML = target.innerText;
}


// renders

const renderGenres = (genres) => {
    const genresCards = document.querySelector('.genre-cards');
    genres.forEach((genre) => {
        const section = document.createElement('section');
        section.className = 'genre';
        section.id = genre.id;

        const parag = document.createElement('p');
        parag.className = 'genre-title';
        parag.innerHTML = genre.name;

        const img = document.createElement('img');
        img.className = 'gnere-img';
        img.src = genre.icons[0].url;

        section.appendChild(img);
        section.appendChild(parag);
        section.addEventListener('click', handleGenreCardClick);
        genresCards.appendChild(section);
    });
};

const renderPlaylists = (playlists) => {
    const playlistsCards = document.querySelector('.playlist-cards');
    playlists.forEach((playlist) => {
        const section = document.createElement('section');
        section.className =  'playlist text-card';
        section.id = playlist.id;

        const parag = document.createElement('p');
        parag.className =  'playlist-title';
        parag.innerHTML = playlist.name;

        section.appendChild(parag);
        section.addEventListener('click', handlePlaylistCardClick);
       playlistsCards.appendChild(section);
    });
};

const renderTracks = (tracks) => {
    const tracksCards = document.querySelector('.tracks-cards');
    
    tracks.forEach((track) => {
        if (track.track.preview_url) {
            const section = document.createElement('section');
            section.className =  'track text-card';
            section.id = track.id;
            section.value = track.track.preview_url;

            const parag = document.createElement('p');
            parag.className =  'track-title';
            parag.innerHTML = track.track.name;

            section.appendChild(parag);
            section.addEventListener('click', handleTrackCardClick);
            tracksCards.appendChild(section);
        }
    });
};

const createPlayer = (src) => {
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.autoplay = true;
    audio.volume = 0.3;
    audio.id = 'player';

    const source = document.createElement('source');
    source.src = src;
    audio.appendChild(source);

    document.querySelector('.player').appendChild(audio);
    return audio;
}

window.onload = async () => {
    try {
    token = await getToken();
    const genres = await getGenres(token);
    renderGenres(genres);
    } catch (error) {
        console.log(error)
    }
};
