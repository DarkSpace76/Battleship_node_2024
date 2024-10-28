import { Player } from "./player";

export class Room {
    id: string;
    players: Player[] = [];

    constructor(id: string | number) {
        this.id = String(id);
    }

    addPlayer(player: Player): void {
        this.players.push(player);
    }
}