import express, {Express, Router} from "express";
import {UserController} from "../controller/UserController";

export function createUserRouter(app: Express, controller: UserController): Router {
    const jsonParser = express.json();
    const userRouter = express.Router();


    userRouter.post("/", jsonParser, async (req, res) => {
        await controller.create(req, res);
    });

    userRouter.get("/", jsonParser, async (req, res) => {
        await controller.search(req, res);
    });

    userRouter.post("/login", jsonParser, async (req, res) => {
        await controller.login(req, res);
    });

    userRouter.post("/logout", jsonParser, async (req, res) => {
        await controller.logout(req, res);
    });

    return userRouter;
}