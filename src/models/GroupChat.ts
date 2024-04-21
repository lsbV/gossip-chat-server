import {User} from "./User";
import {Message} from "./Message";
import {Chat} from "./Chat";

export class GroupChat extends Chat {
    public constructor(id: string,
                       public name: string,
                       public avatar: string,
                       public members: User[],
                       public admin: User,
                       public messages: Message[],
                       createdAt: number = Date.now(),
                       updatedAt: number | null = null,
                       deletedAt: number | null = null
    ) {
        super(id, createdAt, updatedAt, deletedAt);
    }

    public containsUser(userId: string): boolean {
        return this.members.some(member => member.id === userId);
    }

}