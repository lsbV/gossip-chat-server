import {Repository} from "../Repository";
import {Entity} from "../../models/Entity";
import {Document, Model} from "mongoose";
import {CreateEntityError} from "../../Helpers/Errors/CreateEntityError";



export class MongooseRepository extends Repository {
    constructor(protected model: Model<Entity>) {
        super();
    }

    async create(entity: Entity): Promise<Entity> {
        let dbEntity: Document;
        try {
            dbEntity = await this.model.create(entity);
        } catch (error) {
            throw new CreateEntityError(`Couldn't create the entity`, error);
        }
        const newEntity = dbEntity.toObject();
        newEntity.id = newEntity._id;
        delete newEntity._id;
        delete newEntity.__v;
        return newEntity;
    }

}