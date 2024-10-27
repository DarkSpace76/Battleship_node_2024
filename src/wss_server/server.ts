import { RawData, WebSocket, WebSocketServer } from 'ws';
import { AppDb } from '../db/db.js';
import { EventType } from './event_type.js';
import { ClientRegData } from 'src/models/clients.js';
export class Server {

    wss: WebSocketServer;
    db: AppDb;


    constructor(wss: WebSocketServer) {
        this.wss = wss;
        this.db = AppDb.getInstance()
    }

    public start() {


        this.wss.on('connection', (ws: WebSocket) => {
            const idClient = this.getUUID();

            ws.on('error', console.error);

            ws.on('close', () => {

            });

            ws.on('message', (rawData: RawData) => {
                const dataString = rawData.toString();
                const parsedData = JSON.parse(dataString);
                console.log('Parsed data:', parsedData);

                switch (parsedData.type) {
                    case EventType.LoginCreate:
                        this.regNewPlayer(parsedData.data as ClientRegData, idClient, ws);
                        break;

                    case EventType.CreateRoom:
                        console.log('->CreateRoom');
                        break;
                }

            }
            );

        });



    }

    private regNewPlayer(data: ClientRegData, id: string, ws: WebSocket): void {

    }

    private getUUID(): string {
        return crypto.randomUUID();
    }
}