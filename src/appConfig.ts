import mongoose from "mongoose";
import dotenv from 'dotenv';
import {RouterFactory} from "./routes/RouterFactory";
import express, {Express} from "express";
import {container} from "./inversify.config";
import {RepositoryFactory} from "./repositories/RepositoryFactory";
export async function configure(): Promise<{ routerFactory: RouterFactory; express: Express }> {
    dotenv.config({
        path: './.env'
    });
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,);
    if(process.env.NODE_ENV === 'development'){
        mongoose.set('debug', true);
        console.log('Connected to MongoDB');
    }
    const app = express();
    const routerFactory = new RouterFactory(app, container.get<RepositoryFactory>(RepositoryFactory.name));

    return {
        routerFactory,
        express: app
    };
}