import 'reflect-metadata';
import {Express} from "express";
import {configure} from "./appConfig";
import {registerRoutes, setupApp} from './routes';
import {RouterFactory} from "./routes/RouterFactory";


configure().then((config: { routerFactory: RouterFactory; express: Express }) => {
    const app = setupApp(config.express);
    registerRoutes(app, config.routerFactory);
});
