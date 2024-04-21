import Mongoose from 'mongoose';
import {User} from "../User";

const Schema = Mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: "./assets/images/default-avatar.png"
    },
    token: {
        type: String,
        required: false,
        default: null
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

export const MongooseUser = Mongoose.model(User.name, UserSchema);