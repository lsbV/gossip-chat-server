import Mongoose from 'mongoose';
import {PrivateChat} from "../PrivateChat";

const Schema = Mongoose.Schema;
const PrivateChatSchema = new Schema({

    user1: {
        type: String,
        required: true,
    },
    user2: {
        type: String,
        required: true,
    },
    messages: {
        type: Array,
        required: false,
        default: []
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

export const MongoosePrivateChat = Mongoose.model(PrivateChat.name, PrivateChatSchema);