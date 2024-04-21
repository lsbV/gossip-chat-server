import {Entity} from "./Entity";

export class Message extends Entity {

    constructor(
        public content: string,
        public sender: string,
        public receiverId: string,
        id: string | undefined = undefined,
        createdAt: number = Date.now(),
        updatedAt: number | null = null,
        deletedAt: number | null = null
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }
}