import { RawData, WebSocket, WebSocketServer } from 'ws';
import { AppDb } from '../db/db.js';
import { EventType } from './event_type.js';
import { ClientRegData } from '../models/clients.js';
import { ServerCreateGameData, ServerRegData, ServerUpdateRoomDataItem } from '../models/server_data.js';
import { Player } from '../models/player.js';
import { Room } from '../models/room.js';


interface AppData<T> {
    [id: string]: T;
}

export class Server {


    wss: WebSocketServer;
    db: AppDb;
    rooms: AppData<Room>;
    users: AppData<Player>;


    constructor(wss: WebSocketServer) {
        this.wss = wss;
        this.db = AppDb.getInstance()
    }

    public start() {


        this.wss.on('connection', (ws: WebSocket) => {
            const idClient = this.getUUID();
            console.log(idClient);


            ws.on('error', console.error);

            ws.on('close', () => {

            });

            ws.on('message', (rawData: RawData) => {
                const dataString = rawData.toString();
                const parsedData = JSON.parse(dataString);
                console.log('Parsed data:', parsedData);
                const player: Player | undefined = this.getPlayer(idClient);


                switch (parsedData.type) {
                    case EventType.LoginCreate:
                        console.log('->CreateRoom');
                        this.regNewPlayer(parsedData.data as ClientRegData, idClient, ws);
                        break;

                    case EventType.CreateRoom:
                        console.log('->CreateRoom');
                        const room = new Room(this.getSize(this.db.getCollection('rooms')));
                        this.createGame(player.index, ws);
                        // console.log(`room created: ${room}`)
                        // this.db.addValue('rooms', room);

                        // if (player) {
                        //     this.addPlayerToRoom(room, { ...player });
                        //     this.updateRooms();
                        // }
                        break;
                }

            }
            );

        });



    }

    private regNewPlayer(data: ClientRegData, id: string, ws: WebSocket): void {
        if (!this.getPlayer(id)) {
            const player: Player = new Player(data, this.getSize(this.db.getCollection('players')), ws, id);
            console.log(player.id);
            this.db.addValue('players', player);
            console.log(data);
            this.sendMessage<ServerRegData>(ws, EventType.LoginCreate, {
                name: player.name,
                index: player.index,
                error: false,
                errorText: '',
            });
        }
    }

    private addPlayerToRoom(room: Room, player: Player): void {
        room.addPlayer(player);
        this.db.updateValue('rooms', room.id, room);
    }

    private getPlayer(id: string): Player | undefined {
        return this.db.getValue('players', id);
    }

    private getSize<T extends Object>(obj: T): number {
        return Object.entries(obj).length;
    }

    private getUUID(): string {
        return crypto.randomUUID();
    }

    private sendMessage<T>(ws: WebSocket, event: EventType, data: T): void {
        ws.send(this.getMessage<T>(event, data));
    }

    private getMessage<T>(event: EventType, data: T): string {
        return JSON.stringify({
            type: event,
            data: JSON.stringify < (data),
            id: 0,
        });
    }

    private createGame(id: number, ws: WebSocket) {
        this.sendMessage<ServerCreateGameData>(ws, EventType.CreateGame, {
            idGame: 1,
            idPlayer: id
        });
    }




}