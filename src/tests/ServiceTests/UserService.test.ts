import {UserService} from "../../Services/UserService";
import {User} from "../../models/User";
import {Hasher} from "../../Helpers/hasher/Hasher";
import {TokenGenerator} from "../../Helpers/tokenGenerator/TokenGenerator";



describe("UserService", () => {
    let mockRepository: any;
    let userService: UserService;
    const hesher = {compare: jest.fn(), hash: jest.fn()} as Hasher;
    const tokenGenerator = {generate: jest.fn()} as TokenGenerator;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn()
        };
        userService = new UserService(mockRepository, hesher, tokenGenerator);
    });

    describe("create", () => {

        test('should validate and return User', async () => {

                mockRepository.create = jest.fn((user: User) => {
                    user.id = '1';
                    return Promise.resolve(user);
                });
                const user: User = new User('Victor', '', '', '', '');
                const result = await userService.create(user) as User;
                expect(result.id).toBe('1');
            }
        );

        test('should return false when user is invalid', async () => {

            const userService: UserService = new UserService(mockRepository, hesher, tokenGenerator);
            const user: User = new User('', '', '', '', ''); // invalid user name
            const result = await userService.create(user);
            expect(result).toBe(false);
        });
    });

    describe("login", () => {

        test('should return false when user is not found', async () => {

            mockRepository.findOne = jest.fn(() => Promise.resolve(null));
            const result = await userService.login({username: 'John', password: 'Doe'});
            expect(result).toBe(false);
        });

        test('should return false when password is incorrect', async () => {

            mockRepository.findOne = jest.fn(() => Promise.resolve({password: '123'} as User));
            const result = await userService.login({username: 'John', password: '321'});
            expect(result).toBe(false);
        });

        test('should return token when login is successful', async () => {

            mockRepository.findOne = jest.fn(() => Promise.resolve({}));
            hesher.compare = jest.fn(() => Promise.resolve(true));
            tokenGenerator.generate = jest.fn(() => '123');

            const result = await userService.login({username: 'John', password: 'password'});

            expect(result).toEqual({token: '123'});
        });
    });

    describe("logout", () => {

        test('should return false when user is not found', async () => {

            mockRepository.findOne = jest.fn(() => Promise.resolve(null));

            const result = await userService.logout({token: '123'});

            expect(result).toBe(false);
        });

        test('should throw exception when update fails', async () => {

            mockRepository.findOne = jest.fn(() => Promise.resolve({token: '123'} as User));
            mockRepository.update = jest.fn(() => Promise.reject(new Error('asd')));
            try {
                await userService.logout({
                    token: '123'
                });
                fail();
            } catch (e) {
                expect(e).toBeInstanceOf(Error);
            }
        });
    });
});
