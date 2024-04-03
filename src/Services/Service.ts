import {Entity} from "../models/Entity";
import {Repository} from "../repositories/Repository";

export abstract class Service {
    protected constructor(protected repository: Repository) {
    }

    // public abstract create(entity: Entity): Promise<Entity>;
}