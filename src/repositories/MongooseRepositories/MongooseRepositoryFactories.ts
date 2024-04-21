import {RepositoryFactory} from "../RepositoryFactory";
import {Repository} from "../Repository";
import {User} from "../../models/User";
import {injectable} from "inversify";
import {MongooseRepository} from "./MongooseRepository";
import {MongooseUser} from "../../models/mongooseModels/MongooseUser";
import {PrivateChat} from "../../models/PrivateChat";
import {MongoosePrivateChat} from "../../models/mongooseModels/MongoosePrivateChat";
import {GroupChat} from "../../models/GroupChat";
import {MongooseGroupChat} from "../../models/mongooseModels/MongooseGroupChat";
import {Message} from "../../models/Message";
import {MongooseMessage} from "../../models/mongooseModels/MongooseMessage";

@injectable()
export class MongooseRepositoryFactories extends RepositoryFactory {
    private repositoryRegistry: Map<string, () => Repository<any>>;

    constructor(repositoryRegistry: Map<string, () => Repository<any>> | undefined = undefined) {
        super();
        if(repositoryRegistry !== undefined) {
            this.repositoryRegistry = repositoryRegistry;
        }
        else {
            this.repositoryRegistry = new Map([
                [User.name, () => new MongooseRepository(MongooseUser)],
                [Message.name, () => new MongooseRepository(MongooseMessage)],
                [PrivateChat.name, () => new MongooseRepository(MongoosePrivateChat)],
                [GroupChat.name, () => new MongooseRepository(MongooseGroupChat)],
            ])
        }
    }

    createRepository<T>(type: string): Repository<T> {
        if (this.repositoryRegistry.has(type)) {
            const factoryMethod = this.repositoryRegistry.get(type)
            if (factoryMethod === undefined) {
                throw new Error(`Repository of type ${type} not found.`);
            }
            return factoryMethod()
        } else {
            throw new Error(`Repository of type ${type} not found.`);
        }
    }
}