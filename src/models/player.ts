import { WebSocket } from 'ws';

export interface PlayerLoginData {
    name: string;
    password: string;
}

export class Player {
    name: string;
    password: string;
    index: number;
    ws: WebSocket;
    id: string;

    constructor(data: PlayerLoginData, index: number, ws: WebSocket, id: string) {
        this.name = data.name;
        this.password = data.password;
        this.index = index;
        this.ws = ws;
        this.id = id;
    }
}