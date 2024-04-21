import {Service} from "./Service";
import {User} from "../models/User";
import {Repository} from "../repositories/Repository";
import {Hasher} from "../Helpers/hasher/Hasher";
import {TokenGenerator} from "../Helpers/tokenGenerator/TokenGenerator";
import {Condition} from "../Helpers/Condition";

export class UserService extends Service {

    public constructor(private repository: Repository<User>, private hesher: Hasher, private tokenGenerator: TokenGenerator) {
        super();
    }

    public async create(user: User): Promise<User | boolean> {

        if (
            user.name.length <= 5) {
            return false;
        }
        user.password = await this.hesher.hash(user.password);
        return await this.repository.create(user) as User;
    }


    async login(body: { username: string, password: string }) {
        const user = await this.repository.findOne(new Condition("username", body.username));

        if (user === null || !await this.hesher.compare(body.password, user.password)) {
            return false;
        }

        const token = this.tokenGenerator.generate();
        user.token = token;
        await this.repository.update(user);
        return {token};
    }

    public async logout(request: { token: string }): Promise<boolean> {
        const user = await this.repository.findOne(new Condition("token", request.token));
        if (user === null) {
            return false;
        }
        user.token = "";
        await this.repository.update(user);
        return true;
    }


    public async search(request: { name: string }): Promise<User[]> {
        return await this.repository.findMany(new Condition("name", request.name, "like"));
    }
}