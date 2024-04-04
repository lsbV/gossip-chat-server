import {RepositoryFactory} from "../RepositoryFactory";
import {Repository} from "../Repository";
import {User} from "../../models/User";
import {injectable} from "inversify";
import {MongooseRepository} from "./MongooseRepository";
import {MongooseUser} from "../../models/mongooseModels/MongooseUser";

@injectable()
export class MongooseRepositoryFactories extends RepositoryFactory {
    private repositoryRegistry: Map<string, () => Repository>;

    constructor(repositoryRegistry: Map<string, () => Repository> | undefined = undefined) {
        super();
        if(repositoryRegistry !== undefined) {
            this.repositoryRegistry = repositoryRegistry;
        }
        else {
            this.repositoryRegistry = new Map([
                [User.name, () => new MongooseRepository(MongooseUser)]
            ])
        }
    }

    createRepository(type: string): Repository {
        if (this.repositoryRegistry.has(type)) {
            const factoryMethod = this.repositoryRegistry.get(type)
            return factoryMethod()
        } else {
            throw new Error(`Repository of type ${type} not found.`);
        }
    }
}