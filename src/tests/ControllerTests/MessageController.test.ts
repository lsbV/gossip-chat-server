import {MessageController} from "../../controller/MessageController";
import {WebSocketOutputMessage} from "../../models/WebSocketOutputMessage";

describe("MessageController", () => {
    let mockService: any;
    let controller: MessageController;
    let mockMessageRequestValidator: any;
    let mockWebsocket: any;
    let websocketIncomingMessage: any;

    beforeEach(() => {
        mockService = {
            create: jest.fn()
        };
        mockMessageRequestValidator = {
            validateCreateRequest: jest.fn(() => true)
        }
        mockWebsocket = {
            send: jest.fn(),
        }
        websocketIncomingMessage = {
            path: "message",
            type: "message",
            data: {content:"Test data"},
        }
        controller = new MessageController(mockService, mockMessageRequestValidator);
    })

    describe("create", () => {

        test('create method should send correct response', async () => {

            const data= {id: 1};
            mockWebsocket.getUser = jest.fn(() => Promise.resolve(data));
            mockService.create = jest.fn(() => Promise.resolve(data));

            await controller.create(mockWebsocket, websocketIncomingMessage);

            expect(mockWebsocket.send).toHaveBeenCalledWith(new WebSocketOutputMessage(201, "/message", "create", data, websocketIncomingMessage.id));
        });

        test('create method should send bad request response if validation failed', async () => {

            mockMessageRequestValidator.validateCreateRequest = jest.fn(() => false);
            mockWebsocket.sendBadRequest = jest.fn();

            await controller.create(mockWebsocket, websocketIncomingMessage);

            expect(mockWebsocket.sendBadRequest).toHaveBeenCalled();
        });

        test('create method should send bad request response if message service returns false', async () => {

            mockMessageRequestValidator.validateCreateRequest = jest.fn(() => true);
            mockWebsocket.getUser = jest.fn(() => Promise.resolve({}));
            mockService.create = jest.fn(() => Promise.resolve(false));
            mockWebsocket.sendBadRequest = jest.fn();

            await controller.create(mockWebsocket, websocketIncomingMessage);

            expect(mockWebsocket.sendBadRequest).toHaveBeenCalled();
        });
    });


});