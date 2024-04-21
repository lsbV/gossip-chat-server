export class WebSocketOutputMessage {
    constructor(
        public code: number,
        public path: string,
        public type: string,
        public data: any,
        public incomingMessageId: string
    ) {
    }
}