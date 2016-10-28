function MyTunes() {

    /////TO-DO LIST/////
    /**DONE Add tracks when button is clicked
     * DONE Change song's class to a light green hue whenever it's on the favorites list
     * DONE Create functionality of remove, promote, demote methods (incl. writing HTML for that list)
     * DONE Hook button up to showing favorites list
     * DONE Use local storage to save/retrieve favorites list
     * 
     */

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


    function saveTracks() {
        localStorage.setItem('my-tunes', JSON.stringify(_myTracks));
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
}