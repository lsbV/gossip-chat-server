import {RepositoryFactory} from "../repositories/RepositoryFactory";
import {MessageService} from "./MessageService";
import {AuthorizationService} from "./AuthorizationService";
import {User} from "../models/User";
import {PrivateChatService} from "./PrivateChatService";
import {PrivateChat} from "../models/PrivateChat";

export class ServiceFactory {
    constructor(
        private repositoryFactory: RepositoryFactory,
    ) {
    }

    createService(serviceName: string) {
        switch (serviceName) {
            case MessageService.name: {
                return new MessageService(this.repositoryFactory);
            }
            case AuthorizationService.name: {
                const repository = this.repositoryFactory.createRepository<User>(User.name)
                return new AuthorizationService(repository);
            }
            case PrivateChatService.name: {
                return new PrivateChatService(this.repositoryFactory.createRepository<PrivateChat>(PrivateChat.name));
            }

            default:
                throw new Error("Service not found");
        }
    }
}