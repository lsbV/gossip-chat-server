import {RepositoryFactory} from "../RepositoryFactory";
import {Repository} from "../Repository";
import {User} from "../../models/User";
import {MongooseUserRepository} from "./MongooseUserRepository";
import {injectable} from "inversify";

@injectable()
export class MongooseRepositoryFactories extends RepositoryFactory{
    createRepository(type: string): Repository {
        if(type === User.name){
            return new MongooseUserRepository();
        }
        else {
            throw new Error(`Repository of type ${type} not found.`);
        }
    }

}