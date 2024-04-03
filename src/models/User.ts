import {Entity} from "./Entity";

export class User extends Entity{

    constructor(public name: string,
                public login: string,
                public password: string,
                public avatar: string,
                public id: string | undefined = undefined,
                public createdAt: number = Date.now(),
                public updatedAt: Date | null = null,
                public deletedAt: Date | null = null
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }
}