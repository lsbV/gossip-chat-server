import {Request, Response} from "express";
import {UserService} from "../Services/UserService";
import {UserRequest} from "../requests/UserRequest";
import {HttpController} from "./HttpController";

export class UserController extends HttpController {


    constructor(
        protected service: UserService,
        protected userRequest: UserRequest = new UserRequest()) {
        super();
        this.service.create = this.service.create.bind(this.service);
        this.service.login = this.service.login.bind(this.service);
        this.service.logout = this.service.logout.bind(this.service);
        this.service.search = this.service.search.bind(this.service);

    }

    async create(req: Request, res: Response): Promise<void> {
        await this.processRequest(req.body, res, this.userRequest.validateCreateRequest, this.service.create);
    }

    private async processRequest(
        requestData: any,
        response: Response,
        validateMethod: (dataForValidation: any) => boolean,
        serviceMethod: (data: any) => Promise<boolean | object>): Promise<void> {

        if (validateMethod(requestData)) {
            await this.sendRequestToService(requestData, response, serviceMethod);
        } else {
            this.sendAnswerBadRequest(response);
        }
    }

    private async sendRequestToService(
        body: any,
        res: Response,
        serviceMethod: (data: any) => Promise<boolean | object>
    ): Promise<void> {

        try {
            const result = await serviceMethod(body);
            if (result !== false) {
                this.sendAnswerOk(res, result);
            } else {
                this.sendAnswerBadRequest(res);
            }
        } catch (e) {
            this.sendAnswerInternalServerError(res);
        }
    }

    async search(req: Request, res: Response): Promise<void> {
        await this.processRequest(req.body, res, this.userRequest.validateSearchRequest, this.service.search);
    }

    public async login(req: Request, res: Response): Promise<void> {
        await this.processRequest(req.body, res, this.userRequest.validateLoginRequest, this.service.login);
    }


    public async logout(req: Request, res: Response): Promise<void> {
        await this.processRequest(req.body, res, this.userRequest.validateLogoutRequest, this.service.logout);
    }
}