import {WebSocketOutputMessage} from "../models/WebSocketOutputMessage";
import {RawData, WebSocket as WS} from 'ws';
import {WebSocketIncomingMessage} from "../models/WebSocketIncomingMessage";
import {WebSocketController} from "../controller/WebSocketController";
import {MessageController} from "../controller/MessageController";
import {ControllerFactory} from "../controller/ControllerFactory";
import {AuthorizationService} from "../Services/AuthorizationService";
import {User} from "../models/User";
import {Message} from "../models/Message";
import {Chat} from "../models/Chat";
import {PrivateChatController} from "../controller/PrivateChatController";
import {UserController} from "../controller/UserController";


export class UserSocket {
    private token: string = "";
    private user: User | null = null;


    public constructor(
        private readonly socket: WS,
        private readonly controllerFactory: ControllerFactory,
        private readonly authorizationService: AuthorizationService
    ) {

    }

    public send(data: WebSocketOutputMessage): void {
        this.socket.send(JSON.stringify(data));
    }

    public close(): void {
        this.socket.close();
    }

    public listen() {
        this.socket.on("message", async incomingData => {
            try {
                await this.parseAndHandleIncomingData(incomingData);
            } catch (e) {
                this.sendInternalServerError();
            }
        });
    }

    private async parseAndHandleIncomingData(incomingData: RawData) {
        const message: any = JSON.parse(incomingData.toString());

        if (this.incomingDataIsWebSocketIncomingMessage(message)) {
            await this.getControllerByPath(message.path).handle(this, message);
        } else {
            this.sendBadRequest();
        }
    }

    private incomingDataIsWebSocketIncomingMessage(message: any): message is WebSocketIncomingMessage {
        if (message === undefined || !(message instanceof Object)) {
            return false;
        }
        if (message.path === undefined || !(typeof message.path === 'string')) {
            return false;
        }
        if (message.type === undefined || !(typeof message.type === 'string')) {
            return false;
        }
        if (message.data === undefined) {
            return false;
        }
        if (message.token === undefined || !(typeof message.token === 'string')) {
            return false;
        }
        return true;
    }

    private getControllerByPath(path: string): WebSocketController {
        if (path === "message") {
            return this.controllerFactory.getController(MessageController.name);
        }
        else if(path === "privateChat") {
            return this.controllerFactory.getController(PrivateChatController.name);
        }
        else if(path === "user") {
            return this.controllerFactory.getController(UserController.name);
        }
        else {
            throw new Error("Controller not found");
        }
    }

    public sendInternalServerError() {
        this.send(new WebSocketOutputMessage(500, "error", "error", {error: "Internal Server Error"}, ""));
    }


    public sendBadRequest() {
        this.send(new WebSocketOutputMessage(400, "error", "error", {error: "Bad Request"}, ""));
    }

    public sendUnauthorized() {
        this.send(new WebSocketOutputMessage(401, "error", "error", {error: "Unauthorized"}, ""));
    }

    public async isAuthorized(): Promise<boolean> {
        return await this.authorizationService.validateToken(this.token);
    }

    public async authorize(token: string): Promise<void> {
        this.token = token;
        if (!await this.isAuthorized()) {
            this.sendUnauthorized();
            this.close();
        }
    }

    public getUser(): Promise<User | null> {
        return this.authorizationService.getUserByToken(this.token);
    }

    public get User(): User | null {
        return this.user;
    }

    public onReceiveMessage(message: Message): void {
        this.send(new WebSocketOutputMessage(200, "message", "message", message, ""));
    }

    public onReceiveMessages(messages: Message): void {
        this.send(new WebSocketOutputMessage(200, "message", "array", messages, ""));
    }

    public onReceiveChat(chat: Chat): void {
        this.send(new WebSocketOutputMessage(200, "chat", "chat", chat, ""));
    }




}