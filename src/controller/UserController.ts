import {Request, Response} from "express";
import {Controller} from "./Controller";
import {UserService} from "../Services/UserService";

export class UserController extends Controller {
    protected service: UserService;
    constructor(service: UserService) {
        super();
        this.service = service;
    }

    async create(req: Request, res: Response): Promise<void> {
        const body = req.body;
        // if (req.body === undefined ||
        //     req.body.token === undefined ||
        //     req.body.name === undefined ||
        //     req.body.page === undefined ||
        //     req.body.size === undefined) {
        //     res.status(400).send({error: "Bad Request"});
        //     return;
        // }
        try {
            const result = await this.service.create(body);
            if (result === false) {
                res.status(400).send({error: "Bad Request"});
                return;
            }
            res.send(result);
        } catch (e) {
            res.status(500).send({error: "Internal Server Error"});
            console.error(e);
        }
    }

    async find(req: Request, res: Response): Promise<void> {
        // const body = req.body;
        // if(body === undefined || body.token === undefined) {
        //     res.status(400).send({error: "Bad Request"});
        //     return;
        // }
        // try {
        //     const result = await this.service.find(body);
        //     if (result === false) {
        //         res.status(400).send({error: "Bad Request"});
        //         return;
        //     }
        //     res.send(result);
        // } catch (e) {
        //     res.status(500).send({error: "Internal Server Error"});
        //     console.error(e);
        // }
        res.send([{id: 1, name: "John Doe"}, {id: 2, name: "Jane Doe"}]);
    }
}