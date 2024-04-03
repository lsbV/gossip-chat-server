import {Entity} from "../models/Entity";
import {Service} from "./Service";
import {injectable} from "inversify";

@injectable()
export abstract class ServiceFactory{
    public abstract createService(entity: string): Service;
}