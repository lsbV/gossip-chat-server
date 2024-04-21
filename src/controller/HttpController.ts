import {Controller} from "./Controller";
import {Response} from "express";
import {HttpResponseCodes, HttpResponseMessages} from "../Helpers/HttpResponse";

export abstract class HttpController extends Controller {
    protected constructor() {
        super();
    }
    public sendAnswerBadRequest(res: Response) {
        res.status(HttpResponseCodes.BadRequest);
        res.send(HttpResponseMessages.BadRequest);
    }

    public sendAnswerInternalServerError(res: Response) {
        res.status(HttpResponseCodes.InternalServerError);
        res.send(HttpResponseMessages.InternalServerError);
    }

    public sendAnswerOk(res: Response, body: any) {
        res.status(HttpResponseCodes.Ok);
        res.send(body);
    }

    public sendAnswerCreated(res: Response, body: any) {
        res.status(HttpResponseCodes.Created);
        res.send(body);
    }

    public sendAnswerNoContent(res: Response) {
        res.status(HttpResponseCodes.NoContent);
        res.send();
    }

    public sendAnswerNotFound(res: Response) {
        res.status(HttpResponseCodes.NotFound);
        res.send(HttpResponseMessages.NotFound);
    }

}