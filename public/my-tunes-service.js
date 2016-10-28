function MyTunes() {

    var currentPlaylistId = 'big ugly string';

    var _myTracks = loadTracks();
    console.log(_myTracks);

    this.getTracks = function () {
        return _myTracks;
    }

    this.addTrack = function (id) {
        for (var i = 0; i < searchResults.length; i++) {
            var song = searchResults[i];
            if (song.id == id) {
                for (var j = 0; j < _myTracks.length; j++) {
                    if (song.id == _myTracks[j].id) {
                        return;
                    }
                }
                _myTracks.push(song);
                // console.log(_myTracks);
                saveTracks();
                return;
            };
        };
    };

    this.removeTrack = function (id) {
        for (var i = 0; i < this.getTracks().length; i++) {
            var song = this.getTracks()[i];
            if (song.id == id) {
                _myTracks.splice(i, 1);
                saveTracks();
                return;
            }
        }
    }
    this.promoteTrack = function (id) {
        // console.log(id)
        for (var i = 1; i < _myTracks.length; i++) {
            // console.log(_myTracks[i].id);
            if (_myTracks[i].id == id) {
                var temp = _myTracks[i-1];
                _myTracks[i-1] = _myTracks[i];
                _myTracks[i] = temp;
                saveTracks();
                return;
            }
        }
    }
    this.demoteTrack = function (id) {
        for (var i = 0; i < _myTracks.length-1; i++) {
            if (_myTracks[i].id == id) {
                var temp = _myTracks[i+1];
                _myTracks[i+1] = _myTracks[i];
                _myTracks[i] = temp;
                saveTracks();
                return;
            }
        }
    }

    var baseUrl = '../api/playlists/'
    var fullUrl = baseUrl + currentPlaylistId;

    function saveTracks(playlist) {
        var upload = {
            songs: {}
        }
        playlist.forEach(function objectify(song, index) {
            upload.songs[song.id] = song;
            upload.songs[song.id].listOrder = index;
        })
        $.put(fullUrl) //finish this later

        // localStorage.setItem('my-tunes', JSON.stringify(_myTracks));
    }
    function loadTracks() {
        var myTracks = localStorage.getItem('my-tunes');
        if (myTracks) {
            myTracks = JSON.parse(myTracks);
        }else{
            myTracks = []
        }
        return myTracks;
    }

    this.loadListOfPlaylists = function () {
        $.get(baseUrl, function displayPlaylists(listList) {
            console.log(listList)
        })
    }

    this.loadPlaylist = function (playlistId) {

    }
}