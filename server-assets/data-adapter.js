let uuid = require('uuid');
let JsData = require('js-data');
let FBAdapter = require('js-data-firebase');
let DS = new JsData.DS();

let fbAdapter = new FBAdapter(
    {basepath: 'https://my-musical-life.firebaseio.com/'}
)

function formatQuery(query) {
    query = query || "";
    return {with: query.split(',').join(' ').split(' ')}
}

module.exports = {
    DS,
    uuid,
    formatQuery
}