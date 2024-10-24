export var EventType;
(function (EventType) {
    EventType["LoginOrCreate"] = "reg";
    EventType["WinnerUpdate"] = "update_winners";
    EventType["CreateRoom"] = "create_room";
    EventType["AddUserToRoom"] = "add_user_to_room";
    EventType["CreateGame"] = "create_game";
    EventType["UpdateRoom"] = "update_room";
    EventType["AddShips"] = "add_ships";
    EventType["StartGame"] = "start_game";
    EventType["Attack"] = "attack";
    EventType["Turn"] = "turn";
    EventType["Finish"] = "finish";
})(EventType || (EventType = {}));
