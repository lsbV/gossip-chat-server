import {WebSocketController} from "./WebSocketController";
import {UserSocket} from "../sockets/UserSocket";
import {WebSocketIncomingMessage} from "../models/WebSocketIncomingMessage";
import {MessageService} from "../Services/MessageService";
import {MessageRequestValidator} from "../requests/MessageRequestValidator";
import {WebSocketOutputMessage} from "../models/WebSocketOutputMessage";

export class MessageController extends WebSocketController {
    public constructor(
        private readonly messageService: MessageService,
        private readonly messageRequestValidator: MessageRequestValidator,
    ) {
        super();
    }

    public async handle(ws: UserSocket, message: WebSocketIncomingMessage): Promise<void> {
        if (!await ws.isAuthorized()) {
            ws.sendUnauthorized();
            return;
        }
        if (message.type === "create") {
            await this.create(ws, message);
        }
    }

    public async create(ws: UserSocket, message: WebSocketIncomingMessage) {
        if (this.messageRequestValidator.validateCreateRequest(message.data)) {
            const user = await ws.getUser();
            message.data.sender = user!.id;
            const result = await this.messageService.create(message.data);
            if (result) {
                ws.send(new WebSocketOutputMessage(201, "/message", "create", result, message.id));
                return;
            }
        }
        ws.sendBadRequest();
    }


}