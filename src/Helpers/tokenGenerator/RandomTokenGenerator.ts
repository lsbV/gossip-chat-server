import {TokenGenerator} from "./TokenGenerator";
import {injectable} from "inversify";

@injectable()
export class RandomTokenGenerator extends TokenGenerator {
    public generate(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}