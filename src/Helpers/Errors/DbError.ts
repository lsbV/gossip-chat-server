export class DbError extends Error {
    constructor(message: string, public error: any) {
        super(message);
    }
}