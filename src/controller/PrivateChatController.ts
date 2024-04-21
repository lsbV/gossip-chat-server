import {WebSocketController} from "./WebSocketController";
import {UserSocket} from "../sockets/UserSocket";
import {WebSocketIncomingMessage} from "../models/WebSocketIncomingMessage";
import {CreatePrivateChatRequest} from "../requests/chat/PrivateChat/CreatePrivateChatRequest";
import {PrivateChatValidator} from "../requests/chat/PrivateChatValidator";
import {User} from "../models/User";
import {UnAuthorizedError} from "../Helpers/Errors/UnAuthorizedError";
import {BadRequestError} from "../Helpers/Errors/BadRequestError";
import {PrivateChatService} from "../Services/PrivateChatService";
import {WebSocketOutputMessage} from "../models/WebSocketOutputMessage";


export class PrivateChatController extends WebSocketController {
    constructor(
        private readonly chatService: PrivateChatService,
        private readonly chatRequestValidator: PrivateChatValidator,
    ) {
        super();
    }

    public async handle(ws: UserSocket, message: WebSocketIncomingMessage): Promise<void> {
        try {

            switch (message.type) {
                case "create":
                    await this.create(ws, message);
                    break;
                default:
                    ws.sendBadRequest();
            }
        }
        catch (e: any) {
            PrivateChatController.processError(e, ws);
        }

    }


    private static processError(e: Error, ws: UserSocket) {
        if (e instanceof UnAuthorizedError) {
            ws.sendUnauthorized();
        } else if (e instanceof BadRequestError) {
            ws.sendBadRequest();
        } else {
            ws.sendInternalServerError();
        }
    }

    public async create(ws: UserSocket, incomingMessage: WebSocketIncomingMessage): Promise<void> {
        this.validateRequestOrThrowError(this.chatRequestValidator.isValidCreateRequest, incomingMessage.data);

        const request = new CreatePrivateChatRequest(incomingMessage.data);
        await this.checkIfUserIsOneOfTheParticipants(ws, request);

        const newChat = await this.chatService.create(request);
        ws.send( new WebSocketOutputMessage(201, "/chat/private", "create", newChat, incomingMessage.id));
    }

    private validateRequestOrThrowError(validationMethod:(data:any)=>boolean, data:any): boolean {
        if (!validationMethod(data)) {
            throw new BadRequestError("Invalid request data");
        }
        return true;
    }

    private async checkIfUserIsOneOfTheParticipants(ws:UserSocket, request: CreatePrivateChatRequest): Promise<void> {
        const userId = (await ws.getUser() as User).id;
        if(request.user1 !== userId || request.user2 !== userId) {
            throw new UnAuthorizedError("You are not allowed to create chat between other users");
        }

    }
}