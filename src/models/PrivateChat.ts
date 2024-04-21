import {Message} from "./Message";
import {Chat} from "./Chat";

export class PrivateChat extends Chat {
    constructor(

        public user1Id: string,
        public user2Id: string,
        public messages: Message[] = [],
        id: string | undefined = undefined,
        createdAt: number = Date.now(),
        updatedAt: number | null = null,
        deletedAt: number | null = null
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }

    public containsUser(userId: string): boolean {
        return this.user1Id === userId || this.user2Id === userId;
    }
}