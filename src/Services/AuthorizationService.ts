import {Repository} from "../repositories/Repository";
import {User} from "../models/User";
import {Condition} from "../Helpers/Condition";

export class AuthorizationService {
    constructor(private repository: Repository<User>) {
    }

    async getUserByToken(token: string): Promise<User | null> {
        return await this.repository.findOne(new Condition("token", token)) as User | null;
    }

    async validateToken(token: string): Promise<boolean> {
        return (await this.getUserByToken(token)) !== null;
    }
}