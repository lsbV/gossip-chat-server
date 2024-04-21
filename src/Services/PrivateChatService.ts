import {Service} from "./Service";
import {CreatePrivateChatRequest} from "../requests/chat/PrivateChat/CreatePrivateChatRequest";
import {Repository} from "../repositories/Repository";
import {PrivateChat} from "../models/PrivateChat";
import {BadRequestError} from "../Helpers/Errors/BadRequestError";

export class PrivateChatService extends Service{
    constructor(
        private readonly repository: Repository<PrivateChat>
    ) {
        super();
    }

    public async create(request: CreatePrivateChatRequest): Promise<PrivateChat> {
        const user1 = await this.repository.findById(request.user1);
        const user2 = await this.repository.findById(request.user2);

        if (user1 === null || user2 === null) {
            throw new BadRequestError("One of the users doesn't exist");
        }

        const chat = new PrivateChat(user1.id!, user2.id!);
        return await this.repository.create(chat);


    }
}