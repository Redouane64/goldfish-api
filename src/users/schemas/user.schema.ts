import * as mangoose from "mongoose";

export const UserSchema = new mangoose.Schema({
    firstName: String,
    lastName: String,
    friends: [
        { type: mangoose.SchemaTypes.ObjectId, ref: "User" }
    ]
})