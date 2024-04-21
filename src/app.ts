import 'reflect-metadata';
import {configure} from "./appConfig";
import {registerRoutes, setupApp} from './routes';
import {WebSocketServer} from "./sockets/WebSocketServer";
import {Express} from "express";
import {RouterFactory} from "./routes/RouterFactory";


configure().then((config: {
    express: Express,
    routerFactory: RouterFactory
    wss: WebSocketServer,
}) => {
    const app = setupApp(config.express);
    registerRoutes(app, config.routerFactory);

    config.wss.start();
});
