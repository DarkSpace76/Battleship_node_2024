import { wssServer } from "./src/wss/index.js";
import { httpServer } from "./src/http_server/index.js";

const HTTP_PORT = 8181;
const WSS_PORT = 3000;
wssServer(WSS_PORT);
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
