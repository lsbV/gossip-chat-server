import {UserService} from "../../Services/UserService";
import {UserController} from "../../controller/UserController";
import {Request, Response} from "express";
jest.mock("express") ;

describe('UserController', () => {
    let controller: UserController;

    beforeAll(()=>{
        const mockService = {
            create: jest.fn(() => Promise.resolve(false)),
        };

        controller = new UserController(mockService as unknown as UserService);
    })

    test('create method should send correct response', async () => {

        const req = {
            body:  {name: 'John Doe', age: 30}
        };
        const res = {send: jest.fn()};
        await controller.create(req as Request , res as unknown as Response);

        expect(res.send).toHaveBeenCalledWith(req.body);
    });

    test('create method should send response with status 400 if service returns false', async () => {


            const req= {};
            const res = {send: jest.fn(()=> {}), status: jest.fn()};
            await controller.create(req as Request , res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(400);
    });

    test('create method should send response with status 500 if service throws an error', async () => {

            const req= {};
            const res = {send: jest.fn(), status: jest.fn()};
            await controller.create(req as Request , res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(500);
    });
});