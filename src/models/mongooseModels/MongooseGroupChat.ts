import Mongoose from 'mongoose';
import {GroupChat} from "../GroupChat";

const Schema = Mongoose.Schema;
const GroupChatSchema = new Schema({

    members: {
        type: Array,
        required: false,
        default: []
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

export const MongooseGroupChat = Mongoose.model(GroupChat.name, GroupChatSchema);