export class CreateEntityError implements Error {
    name: string;
    message: string;
    stack?: string;

    constructor(message: string, error: Error) {
        this.name = error.name;
        this.message = message;
        this.stack = error.stack;
    }
}