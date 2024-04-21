import Mongoose from 'mongoose';
import {Message} from "../Message";

const Schema = Mongoose.Schema;
const MessageSchema = new Schema({

    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: Date.now,
    },
    updatedAt: {
        type: Number,
        default: null,
    },
    deletedAt: {
        type: Number,
        default: null,
    }
});

export const MongooseMessage = Mongoose.model(Message.name, MessageSchema);