import express from "express";
import fs from "fs";
import {RouterFactory} from "./RouterFactory";
import {User} from "../models/User";


function setupApp(app: express.Express) {
    const jsonParser = express.json();

    app.use((req, res, next) => {
        createAndWriteLog(req.method, req.url, res.statusCode);
        next();
    });

    app.use((req, res, next) => {
        setHeaders(res);
        next();
    });

    app.use(jsonParser);
    app.use(express.static(__dirname + "/public"));

    app.listen(process.env.SERVER_PORT, () => {
        console.log("Server started on http://localhost:" + process.env.SERVER_PORT);
    });

    return app;
}

function registerRoutes(app: express.Express, routerFactory: RouterFactory) {
    const userRouter = routerFactory.createRouter(User.name);
    app.use("/api/v1/users", userRouter);
}

function createAndWriteLog(method: string, url: string, statusCode: number) {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const log = `[${time}] ${method}:${url} ${statusCode}`;
    if (process.env.NODE_ENV === "development") {
        console.log(log);
    }
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log("Unable to append to server.log");
        }
    });
}
function setHeaders(res: express.Response) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json");
}


export {setupApp, registerRoutes};