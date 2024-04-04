import { Container } from "inversify";
import {RepositoryFactory} from "./repositories/RepositoryFactory";
import {MongooseRepositoryFactories} from "./repositories/MongooseRepositories/MongooseRepositoryFactories";

const container = new Container();

container.bind<RepositoryFactory>(RepositoryFactory.name).to(MongooseRepositoryFactories).inSingletonScope();


export {container};