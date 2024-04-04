import {createUserRouter} from "../../routes/userRouter";
import express from "express";
import {UserController} from "../../controller/UserController";

describe("UserRouter", () => {

    test('should create userRouter', async () => {

        const mockController = {
            find: jest.fn(),
            create: jest.fn(),
        };
        const app = express();
        const userRouter = createUserRouter(app, mockController as unknown as UserController);
        expect(userRouter).toBeDefined();
    });
});
