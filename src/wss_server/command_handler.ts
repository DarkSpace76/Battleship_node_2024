import { EventType } from './event_type.js';

export const commandHandler = (message, socket) => {
    const data = JSON.parse(message);
    //console.log(data);

    switch (data.type) {
        case EventType.LoginCreate:
            console.log('Login');
            break;
        case EventType.SinglePlay:
            console.log('Play with bot');
            break;
        case EventType.CreateRoom:
            console.log('Create Room');
            break;
    }

}