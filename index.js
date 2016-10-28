let express = require('express');
let bodyParser = requre('body-parser');
let cors = require('cors');
let routes = require('./server-assets/index');
let handlers = require('./utils/handlers');
let server = express();
let port = process.env.PORT || 2468;
let http = require('http').Server(server);

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use('/', express.static(`${__dirname}/public/`));
server.use('/api', cors(handlers.corsOptions), routes.router);
server.use('/', handlers.defaultErrorHandler);

server.get('/', function(req, res) {
    res.sendfile('index.html');
});

http.listen(port, function () {
    console.log(`Creating worlds on port: ${port}`);
})