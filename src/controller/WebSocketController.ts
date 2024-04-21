import {Controller} from "./Controller";
import {UserSocket} from "../sockets/UserSocket";
import {WebSocketIncomingMessage} from "../models/WebSocketIncomingMessage";

export abstract class WebSocketController extends Controller{
    constructor() {
        super();
    }

    public abstract handle(ws: UserSocket, message: WebSocketIncomingMessage): Promise<void>;

}