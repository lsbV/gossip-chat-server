import {UserSocket} from "./UserSocket";
import {Message} from "../models/Message";

export class UserSocketObservableCollection {
    constructor(
        private observers: UserSocket[] = []
    ) {
    }

    public subscribe(observer: UserSocket) {
        this.observers.push(observer);
    }

    public unsubscribe(observer: UserSocket) {
        this.observers = this.observers.filter((obs: any) => obs !== observer);
    }

    public notify(event: string, data: any) {
        switch (event) {
            case "message": {
                const message = data as Message;
                const receiverSockets = this.observers.filter(observer => {
                    if (observer.User === null) {
                        return false;
                    }
                    return observer.User.id === message.receiverId;
                });
                receiverSockets.forEach(observer => observer.onReceiveMessage(message));
            }
                break;
            case "chat": {
                const chat = data;
                const receiverSockets = this.observers.filter(observer => {
                    if (observer.User === null) {
                        return false;
                    }
                    return chat.containsUser(observer.User.id);
                });
                receiverSockets.forEach(observer => observer.onReceiveChat(chat));
            }
                break;
            default:
                break;
        }
    }
}