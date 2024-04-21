import {Entity} from "./Entity";

export class User extends Entity{

    constructor(public name: string,
                public username: string,
                public password: string,
                public avatar: string,
                public token: string,
                id: string | undefined = undefined,
                createdAt: number = Date.now(),
                updatedAt: number | null = null,
                deletedAt: number | null = null
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }
}