
import { WebSocketServer, createWebSocketStream } from 'ws'
import { commandHandler } from './command_handler.js';
import { Server } from './server.js';

let wss: WebSocketServer;


export const wssServer = (port) => {
    wss = new WebSocketServer({ port: port })

    console.log(`The WebSocket server is running ws://localhost:${port}`);

    const server = new Server(wss);
    server.start();

}

export const wssServerClose = () => {
    wss.close((err) => {
        if (err) console.log(err);
        console.log(`\nWebSocket server close`);
    });
}
