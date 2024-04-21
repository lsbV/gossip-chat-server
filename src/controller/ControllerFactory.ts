import {MessageController} from "./MessageController";
import {ServiceFactory} from "../Services/ServiceFactory";
import {WebSocketController} from "./WebSocketController";
import {MessageRequestValidator} from "../requests/MessageRequestValidator";
import {MessageService} from "../Services/MessageService";
import {PrivateChat} from "../models/PrivateChat";
import {PrivateChatController} from "./PrivateChatController";
import {PrivateChatService} from "../Services/PrivateChatService";
import {PrivateChatValidator} from "../requests/chat/PrivateChatValidator";

export class ControllerFactory{
    private controllerRegistry: Map<string, WebSocketController>;
    constructor(private serviceFactory: ServiceFactory) {
        this.controllerRegistry = new Map<string, WebSocketController>(
            [
                [MessageController.name, new MessageController(serviceFactory.createService(MessageService.name) as MessageService, new MessageRequestValidator())],
                [PrivateChat.name, new PrivateChatController( serviceFactory.createService(PrivateChatService.name) as PrivateChatService, new PrivateChatValidator())],
            ]
        );
    }

    getController(controllerName: string): WebSocketController {
        const controller = this.controllerRegistry.get(controllerName);
        if(controller === undefined){
            throw new Error("Controller not found");
        }
        return controller;
    }
}