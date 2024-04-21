import {UserService} from "../../Services/UserService";
import {UserController} from "../../controller/UserController";
import {Request, Response} from "express";
import {HttpResponseMessages} from "../../Helpers/HttpResponse";

jest.mock("express");

describe("UserController", () => {
    let mockService: any;
    let controller: UserController;
    let userRequest: any;
    let req: any;
    let res: any;
    beforeEach(() => {
        mockService = {
            create: jest.fn(),
            search: jest.fn(),
            login: jest.fn(),
            logout: jest.fn()
        };
        userRequest = {
            validateCreateRequest: jest.fn(() => true),
            validateLoginRequest: jest.fn(() => true),
            validateLogoutRequest: jest.fn(() => true),
            validateSearchRequest: jest.fn(() => true),
        }
        controller = new UserController(mockService as unknown as UserService, userRequest);

        req = {data: "Test data"};
        res = {send: jest.fn(), status: jest.fn()};
    });


    describe("create", () => {

        test('create method should send correct response', async () => {

            mockService.create = jest.fn(() => Promise.resolve(req.body));
            await controller.create(req as Request, res as unknown as Response);

            expect(res.send).toHaveBeenCalledWith(req.body);
        });

        test('create method should send response with status 400 if service returns false', async () => {

            mockService.create = jest.fn(() => Promise.resolve(false));
            await controller.create(req as Request, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('create method should send response with status 400 if request is invalid', async () => {

            userRequest.validateCreateRequest = jest.fn(() => false);
            await controller.create(req as Request, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(400);
        });

        test('create method should send response with status 500 if service throws an error', async () => {

            mockService.create = jest.fn(() => Promise.reject());
            await controller.create(req as Request, res as unknown as Response);

            expect(res.status).toHaveBeenCalledWith(500);
        });
    });


    describe("search", () => {

        test('search method should send correct response', async () => {

            const requestData = {name: "John Doe"};
            mockService.search = jest.fn(() => Promise.resolve(requestData));
            await controller.search(req as Request, res as unknown as Response);

            expect(res.send).toHaveBeenCalledWith(requestData);
        });
    });


    describe("login", () => {

        test('login method should send correct response', async () => {

            mockService.login = jest.fn(() => Promise.resolve('token'));
            await controller.login(req as Request, res as unknown as Response);

            expect(res.send).toHaveBeenCalledWith('token');
        });
    });


    describe("logout", () => {

        test('logout method should send correct response', async () => {

            mockService.logout = jest.fn(() => Promise.resolve(HttpResponseMessages.LoggedOut));
            await controller.logout(req, res);

            expect(res.send).toHaveBeenCalledWith(HttpResponseMessages.LoggedOut);
        });
    });
});

