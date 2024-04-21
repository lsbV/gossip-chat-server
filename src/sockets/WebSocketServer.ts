import {WebSocketServer as WSS} from 'ws';
import {UserSocket} from "./UserSocket";
import {AppFactory} from "../AppFactory";
import {AuthorizationService} from "../Services/AuthorizationService";
import {UserSocketObservableCollection} from "./UserSocketObservableCollection";

export class WebSocketServer {
    private readonly wss: WSS;

    constructor(
        port: number,
        private readonly appFactory: AppFactory,
        private readonly userSocketObservableCollection: UserSocketObservableCollection
    ) {
        this.wss = new WSS({port: port});
        console.log(`WebSocket server started on port ${port}`);
    }


    public start(): void {
        this.wss.on("connection", async ws => {
            const authorizationService = this.appFactory.serviceFactory.createService(AuthorizationService.name) as AuthorizationService;
            const socket = new UserSocket(ws, this.appFactory.controllerFactory, authorizationService);
            this.userSocketObservableCollection.subscribe(socket);
            socket.listen();
        });

        this.wss.on("error", (error) => {
            console.error(error);
        });
    }


}