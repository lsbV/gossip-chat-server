import {UserService} from "../../Services/UserService";
import {User} from "../../models/User";

describe("UserService", () => {

    test('should validate and return User', async () => {

            const mockRepository = {
                create: jest.fn((user: User) => {
                    user.id = '1';
                    return Promise.resolve(user);
                })
            };
            const userService: UserService = new UserService(mockRepository);
            const user: User = new User('Victor', '', '', '');
            const result = await userService.create(user) as User;
            expect(result.id).toBe('1');
        }
    );

    test('should return false when user is invalid', async () => {
        const mockRepository = {
            create: jest.fn()
        };
        const userService: UserService = new UserService(mockRepository);
        const user: User = new User('', '', '', ''); // invalid user name
        const result = await userService.create(user);
        expect(result).toBe(false);
    });
});
