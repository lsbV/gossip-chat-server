import {Condition} from "../Helpers/Condition";

export abstract class Repository<T> {
    public abstract create(entity: T): Promise<T>;

    public abstract findOne(condition: Condition): Promise<T | null>;

    public abstract findById(id: string): Promise<T | null>;

    public abstract findMany(condition: Condition): Promise<T[]>;

    public abstract update(entity: T): Promise<T>;
}