let CommonForWebSocketStart = require("./Projects/KWSServer/EntryFile");
let CommonHomeController = require("./StartUp/Home.controller");

require('dotenv').config();

const express = require('express');
const http = require('http');
const app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
const server = http.createServer(app);

var port = normalizePort(process.env.PORT || '3000');

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '100mb' }));

app.get('/', CommonHomeController.GetFunc);

CommonForWebSocketStart(server);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
};

server.listen(port, () => {
    console.log(`Listening in port : ${port}`);
    console.log(`Click to open : http://localhost:${port}`);
});

