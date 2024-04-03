import 'reflect-metadata';
import express, {Express} from "express";
import {configure} from "./appConfig";
import {createApp} from './routes';
import {RouterFactory} from "./routes/RouterFactory";


configure().then((config:{ routerFactory: RouterFactory; express: Express }) => {
    createApp(config.express, config.routerFactory);
});
