import {Express, Router} from "express";
import {User} from "../models/User";
import {UserController} from "../controller/UserController";
import {createUserRouter} from "./userRouter";
import {UserService} from "../Services/UserService";
import {RepositoryFactory} from "../repositories/RepositoryFactory";

export class RouterFactory {
    constructor(private app: Express, private repositoryFactory: RepositoryFactory) {
    }

    public createRouter(type: string): Router {
        if (type === User.name) {
            const repository = this.repositoryFactory.createRepository(type);
            const userService = new UserService(repository)
            const controller = new UserController(userService);
            return  createUserRouter(this.app, controller);
        }


        else {
            throw new Error(`Invalid type! ${type} is not a valid type!`);
        }
    }
}