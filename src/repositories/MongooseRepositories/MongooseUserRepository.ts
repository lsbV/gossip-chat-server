import {Entity} from "../../models/Entity";
import {MongooseRepository} from "./MongooseRepository";
import {MongooseUser} from "../../models/mongooseModels/MongooseUser";
import {User} from "../../models/User";

export class MongooseUserRepository extends MongooseRepository {
    constructor(){
        super(MongooseUser);
    }
    async create(entity: User): Promise<Entity> {
        const dbUser = await this.model.create(entity);
        const user = dbUser.toObject();
        user.id = user._id;
        user._id = undefined;
        return user;
    }
}