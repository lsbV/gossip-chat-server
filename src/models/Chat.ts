import {Entity} from "./Entity";

export abstract class Chat extends Entity {

    protected constructor(id: string | undefined,
                          createdAt: number = Date.now(),
                          updatedAt: number | null = null,
                          deletedAt: number | null = null
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }

    public abstract containsUser(userId: string): boolean;

}