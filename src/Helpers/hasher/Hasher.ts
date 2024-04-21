import {injectable} from "inversify";

@injectable()
export abstract class Hasher{
    public abstract hash(data: string): Promise<string>;
    public abstract compare(data: string, hash: string): Promise<boolean>;
}
