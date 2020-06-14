import * as mangoose from "mongoose";

export const GroupSchema = new mangoose.Schema({
    name: String,
    members: [
        { type: mangoose.SchemaTypes.ObjectId, ref: "User" }
    ]
})