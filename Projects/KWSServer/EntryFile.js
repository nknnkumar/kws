const WebSocket = require('ws');
let wss;
const clients = new Map();
let CommoninsertToClients = require('./insertToClients')

let StartFunc = (server) => {
    wss = new WebSocket.Server({ server });

    wss.on("connection", WsOnConnection);
};

let WsOnConnection = (ws, req) => {
    CommoninsertToClients({
        inClients: clients,
        ws
    });

    ws.on('message', (data, isBinary) => {
        console.log("aaaaaaaaaaa : ", data, isBinary);

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
        // CommonOnMessage({
        //     inMessageAsString: messageAsString,
        //     inClients: clients,
        //     inws: ws,
        //     inwss: wss,
        //     inVerifyToken: LocalFromVerifyToken
        // })
        setTimeout(function timeout() {
            ws.send(Date.now());
        }, 500);
    });

    ws.on('close', () => {
        console.log('closed');
    });

    // ws.send('Hai Socket established');
    ws.send(Date.now());
};

module.exports = StartFunc;