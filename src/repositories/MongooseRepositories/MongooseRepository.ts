import {Repository} from "../Repository";
import {Document, Model} from "mongoose";
import {DbError} from "../../Helpers/Errors/DbError";
import {Condition} from "../../Helpers/Condition";


export class MongooseRepository<T> extends Repository<T> {
    constructor(protected model: Model<any>) {
        super();
    }

    async create(entity: T): Promise<T> {
        try {
            const dbEntity = await this.model.create(entity);
            return MongooseRepository.convertToEntity(dbEntity);
        } catch (error: any) {
            console.log(error);
            throw new DbError(`Couldn't create the entity`, error);
        }
    }

    private static convertToEntity(dbEntity: Document<any, any, any>): any {
        const newEntity = dbEntity.toObject();
        newEntity.id = newEntity._id;
        delete newEntity._id;
        delete newEntity.__v;
        return newEntity;
    }

    async findOne(condition: Condition): Promise<T | null> {
        try {
            const dbEntity = await this.model.findOne(condition.convertToMongooseFilter());
            if (dbEntity === null) {
                return null;
            }
            return MongooseRepository.convertToEntity(dbEntity);
        } catch (error: any) {
            throw new DbError(`Something went wrong while finding the entity(${condition.property} = ${condition.value})`, error);
        }
    }

    async findById(id: string): Promise<T | null> {
        try {
            const dbEntity = await this.model.findById(id);
            if (dbEntity === null) {
                return null;
            }
            return MongooseRepository.convertToEntity(dbEntity);
        } catch (error: any) {
            throw new DbError(`Something went wrong while finding the entity with id ${id}`, error);
        }
    }

    async findMany(condition: Condition): Promise<T[]> {
        try {
            const dbEntities = await this.model.find(condition.convertToMongooseFilter());
            return dbEntities.map(MongooseRepository.convertToEntity);
        } catch (error: any) {
            throw new DbError(`Something went wrong while finding the entity(${condition.property} = ${condition.value})`, error);
        }
    }

    async update(entity: T): Promise<T> {
        const id = (entity as any).id;
        const dbEntity = await this.model.findByIdAndUpdate<T>(id, entity as any, {new: true});
        if (dbEntity === null) {
            throw new DbError(`Couldn't find the entity with id ${id}`, entity);
        }
        return MongooseRepository.convertToEntity(dbEntity as any);
    }
}