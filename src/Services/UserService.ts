import {Entity} from "../models/Entity";
import {Service} from "./Service";
import {User} from "../models/User";
import {Repository} from "../repositories/Repository";

export class UserService extends Service{
    public constructor(repository: Repository) {
        super(repository);
    }
    public async create(entity: User): Promise<User | boolean> {

        const user = entity as User;
        if (user.id !== undefined ||
            user.name.length <= 5) {
            return false;
        }
        return await this.repository.create(entity) as User;
    }


}