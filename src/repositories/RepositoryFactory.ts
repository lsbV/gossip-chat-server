import {Repository} from "./Repository";
import {injectable} from "inversify";

@injectable()
export abstract class RepositoryFactory {
    public abstract createRepository<T>(type: string): Repository<T>;
}