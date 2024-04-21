export class WebSocketIncomingMessage{
    constructor(
        public id: string,
        public path: string,
        public type: string,
        public data: any,
        public token: string,
    ) {
    }
}