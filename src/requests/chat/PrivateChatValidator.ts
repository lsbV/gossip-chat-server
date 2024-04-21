export class PrivateChatValidator {
    public isValidCreateRequest(data: any): boolean {
        if(data === undefined || data === null) {
            return false;
        }
        if(!data.user1 && !(typeof data.user1 === "string")) {
            return false;
        }
        if(!data.user2 && !(typeof data.user2 === "string")) {
            return false;
        }
        return true;
    }
}