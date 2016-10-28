var itunes = {
    getMusicByArtist: function (artist, cb) {

        var url = '//bcw-getter.herokuapp.com/?url=';
        var url2 = 'https://itunes.apple.com/search?term=' + artist;
        var apiUrl = url + encodeURIComponent(url2);

        $('#get-music-button').text('LOADING....');

        return $.getJSON(apiUrl).then(function (response) {
            var filteredList = response.results.filter(function(entry){
                if(entry.kind == 'song'){
                    return true;
                }else{
                    return false;
                }
            })
            var songList = filteredList.map(function (song) {
                return {
                    title: song.trackName,
                    id: song.trackId,
                    albumArt: song.artworkUrl60,
                    artist: song.artistName,
                    collection: song.collectionName,
                    price: song.collectionPrice,
                    preview: song.previewUrl,
                    purchaseUrl: song.collectionViewUrl
                };
            })
            $('#get-music-button').text('Get Music');
            return songList;
        })
    }
}