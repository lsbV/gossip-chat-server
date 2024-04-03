import Mongoose, {Model, Types} from 'mongoose';
import ObjectId = Types.ObjectId;
import {User} from "../User";

const Schema = Mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
});

export const MongooseUser:Model<any> = Mongoose.model(User.name, UserSchema);