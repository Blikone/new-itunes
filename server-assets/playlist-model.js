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

function create(name, callback) {
    let playlist = {
        id: uuid.v4(),
        name: name
    };
    Playlist.create(playlist).then(callback).catch(callback);
}

function getAll(query, callback) {
    Playlist.findAll({}).then(callback).catch(callback);
}

function getById(query, id, callback) {
    Playlist.find(id, formatQuery(query)).then(callback).catch(callback); 
}

module.exports = {
    create,
    getAll,
    getById
}