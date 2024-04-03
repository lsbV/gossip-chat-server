import express, {Express, Router} from "express";
import {UserController} from "../controller/UserController";

export function createUserRouter(app: Express, controller: UserController): Router {
    const jsonParser = express.json();
    const userRouter = express.Router();


    userRouter.get("/", jsonParser, async (req, res) => {
        await controller.find(req, res);
    });

    userRouter.post("/", jsonParser, async (req, res) => {
        await controller.create(req, res);
    });

    return userRouter;
}
