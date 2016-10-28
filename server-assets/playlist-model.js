let dataAdapter = require('./data-adapter');
let uuid = dataAdapter.uuid;
let DS = dataAdapter.DS;
let formatQuery = dataAdapter.formatQuery;

let Playlist = DS.defineResource({
    name: 'playlist',
    endpoint: 'playlists'
    // relations: {
    //     hasMany: {
    //         song: {
    //             localField: 'songs',
    //             foreignId: 'playlistId'
    //         }
    //     }
    // }
})

function create(input, callback) {
    let playlist = {
        id: uuid.v4(),
        name: input.name,
        upvotes: 0,
        downvotes: 0,
        songs: input.songs
    };
    Playlist.create(playlist).then(callback).catch(callback);
}

function getAll(callback) {
    Playlist.findAll({}).then(callback).catch(callback);
}

function getById(id, callback) {
    Playlist.find(id).then(callback).catch(callback); 
}

function editRank(id, vote, callback) {
    Playlist.find(id).then(function recordVote(playlist) {
        if (vote == "upvote") {
            playlist.upvotes++
        } else if (vote == "downvote") {
            playlist.downvotes++
        }
        Playlist.update(id, playlist).then(callback).catch(callback)
    }).catch(callback)
}

function updatePlaylist(id, songs, callback) {
    Playlist.find(id).then(function updateSongs(playlist) {
        playlist.songs = songs;
        Playlist.update(id, playlist).then(callback).catch(callback)
    }).catch(callback)
}

module.exports = {
    create,
    getAll,
    getById,
    editRank,
    updatePlaylist
}