import {MessageService} from "../../Services/MessageService";
import {Condition} from "../../Helpers/Condition";

describe('MessageService', () => {

    let mockRepositoryFactory: any;
    let messageService: MessageService;
    let data: any;

    beforeEach(() => {
            mockRepositoryFactory = {
                createRepository: () => {
                    return {
                        find: jest.fn(),
                        create: jest.fn()
                    };
                }
            };
            messageService = new MessageService(mockRepositoryFactory);
            data = {
                content: 'Hello World',
                receiver: 'receiver',
                sender: 'sender'
            };
        }
    );

    describe('create', () => {

        let chat: any;
        let mockRepositoryMethods: any;

        beforeEach(() => {
            chat = {
                containsUser: jest.fn(()=>true),
                id: 'id'
            };
            mockRepositoryMethods = {
                findOne: jest.fn(() => chat),
                create: jest.fn(()=>{})
            };
        });

        test("should return correct message", async () => {

            mockRepositoryFactory.createRepository = jest.fn(() => mockRepositoryMethods);
            messageService = new MessageService(mockRepositoryFactory);

            await messageService.create(data);

            expect(mockRepositoryMethods.findOne).toHaveBeenNthCalledWith(1, new Condition("id", data.receiver));
            expect(mockRepositoryMethods.create).toHaveBeenCalled();
        });


        test("should return false if chat is null", async () => {

            mockRepositoryMethods.findOne = jest.fn(() => null);
            mockRepositoryFactory.createRepository = jest.fn(() => mockRepositoryMethods);
            messageService = new MessageService(mockRepositoryFactory);

            const result = await messageService.create(data);

            expect(result).toBe(false);
        });

        test("should return false if chat does not contain user", async () => {

            chat.containsUser = jest.fn(()=>false);
            mockRepositoryFactory.createRepository = jest.fn(() => mockRepositoryMethods);
            messageService = new MessageService(mockRepositoryFactory);

            const result = await messageService.create(data);

            expect(result).toBe(false);
        });
    });
});