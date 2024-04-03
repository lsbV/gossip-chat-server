import {Repository} from "../Repository";
import {Entity} from "../../models/Entity";
import {Model} from "mongoose";
import {User} from "../../models/User";

export class MongooseRepository extends Repository{
    constructor(protected model: Model<any>) {
        super();
    }
    async create(entity: Entity): Promise<Entity> {
        return entity;
    }

}