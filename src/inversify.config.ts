import { Container } from "inversify";
import {RepositoryFactory} from "./repositories/RepositoryFactory";
import {MongooseRepositoryFactories} from "./repositories/MongooseRepositories/MongooseRepositoryFactories";
import {TokenGenerator} from "./Helpers/tokenGenerator/TokenGenerator";
import {RandomTokenGenerator} from "./Helpers/tokenGenerator/RandomTokenGenerator";
import {Hasher} from "./Helpers/hasher/Hasher";
import {BcryptHesher} from "./Helpers/hasher/BcryptHesher";

const container = new Container();

container.bind<RepositoryFactory>(RepositoryFactory.name).to(MongooseRepositoryFactories).inSingletonScope();

container.bind<TokenGenerator>(TokenGenerator.name).to(RandomTokenGenerator);
container.bind<Hasher>(Hasher.name).to(BcryptHesher);


export {container};