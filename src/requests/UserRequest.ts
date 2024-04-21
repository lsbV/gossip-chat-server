

export class UserRequest{

    public validateLoginRequest(body: { username: string|undefined, password: string | undefined , token: string | undefined }) {
        if(body === undefined) {
            return false;
        }
        if(body.username && body.password) {
            return true;
        }
        return false;
    }

    public validateLogoutRequest(body: any) {
        return body !== undefined && body.token !== undefined;
    }

    public validateCreateRequest(body: any) {
        return body !== undefined && body.name !== undefined && body.username !== undefined && body.password !== undefined;
    }

    public validateSearchRequest(body: any) {
        return body !== undefined && body.name !== undefined;
    }
}