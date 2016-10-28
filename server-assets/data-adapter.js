let uuid = require('node-uuid');
let JsData = require('js-data');
let FBAdapter = require('js-data-firebase');
let DS = new JsData.DS();

let fbAdapter = new FBAdapter(
    { basePath: 'https://my-musical-life.firebaseio.com/' }
)


DS.registerAdapter('firebase', fbAdapter, { default: true })


function formatQuery(query) {
    query = query || "";
    return { with: query.split(',').join(' ').split(' ') }
}

module.exports = {
    DS,
    uuid,
    formatQuery
}