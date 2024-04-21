import {Express, Router} from "express";
import {User} from "../models/User";
import {UserController} from "../controller/UserController";
import {createUserRouter} from "./userRouter";
import {UserService} from "../Services/UserService";
import {RepositoryFactory} from "../repositories/RepositoryFactory";
import {TokenGenerator} from "../Helpers/tokenGenerator/TokenGenerator";
import {Hasher} from "../Helpers/hasher/Hasher";
import {UserRequest} from "../requests/UserRequest";

export class RouterFactory {
    constructor(private app: Express, private repositoryFactory: RepositoryFactory, private tokenGenerator: TokenGenerator, private hasher: Hasher) {
    }

    public createRouter(type: string): Router {
        if (type === User.name) {
            const repository = this.repositoryFactory.createRepository<User>(type);
            const userService = new UserService(repository, this.hasher, this.tokenGenerator);
            const userRequest = new UserRequest(); // TODO ?
            const controller = new UserController(userService, userRequest);
            return createUserRouter(this.app, controller);
        } else {
            throw new Error(`Invalid type! ${type} is not a valid type!`);
        }
    }
}