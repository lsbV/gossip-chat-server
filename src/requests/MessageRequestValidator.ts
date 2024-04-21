export class MessageRequestValidator {

    public validateCreateRequest(data: any) {
        if(data === undefined){
            return false;
        }
        if(data.content === undefined || !(typeof data.content === 'string')){
            return false;
        }
        if(data.receiver === undefined || !(typeof data.receiver === 'string')){
            return false;
        }
        return true;
    }


}