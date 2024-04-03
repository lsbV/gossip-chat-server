import {User} from "./User";
import {Message} from "./Message";
import {Chat} from "./Chat";

export class PrivateChat extends Chat {
    constructor(
        id: string,
        public user1: User,
        public user2: User,
        public messages: Message[],
        createdAt: number = Date.now(),
        updatedAt: Date | null = null,
        deletedAt: Date | null = null
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }
}