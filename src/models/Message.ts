import {User} from "./User";
import {Chat} from "./Chat";
import {Entity} from "./Entity";

export class Message extends Entity {

    constructor(
        id: string,
        public content: string,
        public sender: User,
        public receiver: Chat,
        createdAt: number = Date.now(),
        updatedAt: Date | null = null,
        deletedAt: Date | null = null
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }
}