export interface ServerRegData {
    name: string;
    index: number;
    error: boolean;
    errorText: string;
}

export interface ServerCreateGameData {
    idGame: number;
    idPlayer: number;
}


export interface ServerUpdateRoomDataItem {
    roomId: string;
    roomUsers: {
        name: string;
        index: number;
    }[];
}

export type ServerData =
    | ServerRegData
    | ServerCreateGameData
    | ServerUpdateRoomDataItem[];