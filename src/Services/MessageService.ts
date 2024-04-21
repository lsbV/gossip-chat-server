import {Service} from "./Service";
import {Repository} from "../repositories/Repository";
import {Message} from "../models/Message";
import {RepositoryFactory} from "../repositories/RepositoryFactory";
import {PrivateChat} from "../models/PrivateChat";
import {GroupChat} from "../models/GroupChat";
import {Chat} from "../models/Chat";

export class MessageService extends Service {
    private privateChatRepository: Repository<Chat>;
    private groupChatRepository: Repository<GroupChat>;
    private messageRepository: Repository<Message>;

    constructor(private repositoryFactory: RepositoryFactory) {
        super();
        this.privateChatRepository = this.repositoryFactory.createRepository(PrivateChat.name);
        this.groupChatRepository = this.repositoryFactory.createRepository(GroupChat.name);
        this.messageRepository = this.repositoryFactory.createRepository(Message.name);
    }

    public async create(data: {
        content: string,
        receiverId: string,
        senderId: string,
    }): Promise<Message | boolean> {

        const chat = await this.getChat(data.receiverId);
        if (chat === null || !chat.containsUser(data.senderId) || chat.id === undefined) {
            return false;
        }
        const message = new Message(data.content, data.senderId, chat.id);
        return await this.messageRepository.create(message) as Message;
    }

    private async getChat(receiverId: string) {
        let chat = await this.privateChatRepository.findById(receiverId);
        if (!chat) {
            chat = await this.groupChatRepository.findById(receiverId);
        }
        return chat as Chat | null;
    }
}


