import {Entity} from "./Entity";

export class Chat extends Entity{

    public constructor(id: string,
                       createdAt: number = Date.now(),
                       updatedAt: Date | null = null,
                       deletedAt: Date | null = null
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }
}