import {injectable} from "inversify";

@injectable()
export abstract class TokenGenerator {
    public abstract generate(): string;
}