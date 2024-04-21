export class CreatePrivateChatRequest {

    public user1: string;
    public user2: string;
    public constructor(data: any) {
        this.user1 = data.user1;
        this.user2 = data.user2;
    }
}
