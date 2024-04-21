import {Hasher} from "./Hasher";
import bcrypt from "bcrypt";
import {injectable} from "inversify";

@injectable()
export class BcryptHesher extends Hasher{
    public async hash(data: string): Promise<string> {
        return await bcrypt.hash(data, 10);
    }

    public async compare(data: string, hash: string) {
        return await bcrypt.compare(data, hash);
    }
}