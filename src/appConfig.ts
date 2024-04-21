import mongoose from "mongoose";
import dotenv from 'dotenv';
import {RouterFactory} from "./routes/RouterFactory";
import express, {Express} from "express";
import {container} from "./inversify.config";
import {RepositoryFactory} from "./repositories/RepositoryFactory";
import {TokenGenerator} from "./Helpers/tokenGenerator/TokenGenerator";
import {Hasher} from "./Helpers/hasher/Hasher";
import {ServiceFactory} from "./Services/ServiceFactory";
import {ControllerFactory} from "./controller/ControllerFactory";
import {AppFactory} from "./AppFactory";
import {UserSocketObservableCollection} from "./sockets/UserSocketObservableCollection";
import {WebSocketServer} from "./sockets/WebSocketServer";

export async function configure(): Promise<{
    express: Express,
    routerFactory: RouterFactory,
    wss: WebSocketServer,
}> {
    dotenv.config({path: './.env'});
    await mongoose.connect(process.env.MONGO_URL as string);

    const app = express();
    const repositoryFactory = container.get<RepositoryFactory>(RepositoryFactory.name)
    const tokenGenerator = container.get<TokenGenerator>(TokenGenerator.name);
    const hasher = container.get<Hasher>(Hasher.name);

    const routerFactory = new RouterFactory(app, repositoryFactory, tokenGenerator, hasher);
    const serviceFactory = new ServiceFactory(repositoryFactory);
    const controllerFactory = new ControllerFactory(serviceFactory);

    const appFactory = new AppFactory(controllerFactory, serviceFactory);
    const userSocketObservableCollection = new UserSocketObservableCollection();
    const port = parseFloat(process.env.WEB_SOCKET_PORT as string);
    const wss = new WebSocketServer(port, appFactory, userSocketObservableCollection);

    return {
        express: app,
        routerFactory: routerFactory,
        wss: wss,
    };
}