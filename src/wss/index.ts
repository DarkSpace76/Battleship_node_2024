
import { WebSocketServer, createWebSocketStream } from 'ws'

let wss: WebSocketServer;


export const wssServer = (port) => {
    wss = new WebSocketServer({ port: port })

    // Creating connection using websocket
    wss.on("connection", (ws, req) => {

        let duplex = createWebSocketStream(ws, { encoding: 'utf-8', defaultEncoding: 'utf-8', decodeStrings: false });
        // ::1 = 127.0.0.1 || localhost
        let ip = req.socket.remoteAddress === '::1' ? '127.0.0.1' : req.socket.remoteAddress;
        console.log(`client connected, ip:  ${ip}`);

        duplex.on('data', function (data) {

            const dta = JSON.stringify({
                name: 'test',
                index: 1,
                error: false,
                errorText: '',
            });

            const jsonString = {
                type: 'reg',
                data: dta,
                id: 0,
            };

            // Отправка JSON-строки через WebSocket
            ws.send(JSON.stringify(jsonString));

        });
        duplex.on('close', function () {
            console.log("the duplex channel has closed")
        });

        duplex.on('error', err => {
            console.log(`Duplex stream error: ${err}`);
        });

        // handling what to do when clients disconnects from server
        ws.on("close", () => {
            console.log(`the client has disconnected`);
        });
        // handling client connection error
        ws.onerror = function () {
            console.log(`Some Error occurred`);
        }
    });

    console.log(`The WebSocket server is running ws://localhost:${port}`);
}

export const wssServerClose = () => {
    wss.close((err) => {
        if (err) console.log(err);
        console.log(`\nWebSocket server close`);
    });
}
