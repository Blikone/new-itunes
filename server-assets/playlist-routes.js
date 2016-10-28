const router = require('express').Router();
const Playlist = require('./playlist-model.js');

module.exports.mountPath = '/playlists';
module.exports.router = router;

router.route('/:id?')
    .get(function (req, res, next) {
        if (req.params.id) {
            Playlist.getById(req.params.id, function (playlist) {
                if (playlist.stack) { return next(playlist) }
                return res.send(playlist)
            })
        } else {
            Playlist.getAll(function (playlists) {
                if (playlists.stack) { return next(playlists) }
                return res.send(playlists);
            });
        }
    })
    .post(function (req, res, next) {
        Playlist.create(req.body, function (playlist) {
            if (playlist.stack) { return next(playlist) };
            return res.send(playlist);
        })
    })
    .put(function (req, res, next) {
        if (req.body.vote) {
            Playlist.editRank(req.params.id, req.body.vote, function (playlist) {
                if (playlist.stack) { return next(playlist) };
                return res.send({message: "Your vote has been recorded"})
            })
        }
        if (req.body.songs) {
            playlist.updatePlaylist(req.params.id, req.body.songs, function (playlist) {
                if (playlist.stack) { return next(playlist) };
                return res.send({message: "Your change has been logged"})
            })
        }
    })
    .delete(function (req, res, next) {
        res.send('Hello, Ginny Weasley.  My name is Tom Riddle.')
    })
