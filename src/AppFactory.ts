import {ControllerFactory} from "./controller/ControllerFactory";
import {ServiceFactory} from "./Services/ServiceFactory";

export class AppFactory {
    constructor(
        public readonly controllerFactory: ControllerFactory,
        public readonly serviceFactory: ServiceFactory,
    ) {
    }

}