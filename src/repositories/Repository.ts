import {Entity} from "../models/Entity";

export abstract class Repository {
    public abstract create(entity: Entity): Promise<Entity>;

    // public abstract filter(filters: Filter[], page: number, size: number): Promise<Entity[]>;

}