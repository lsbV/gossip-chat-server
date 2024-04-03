import {User} from "./User";
import {Message} from "./Message";
import {Chat} from "./Chat";

export class GroupChat extends Chat {
    public constructor(id: string,
                       public name: string,
                       public avatar: string,
                       public users: User[],
                       public admin: User,
                       public messages: Message[],
                       createdAt: number = Date.now(),
                       updatedAt: Date | null = null,
                       deletedAt: Date | null = null
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }

}