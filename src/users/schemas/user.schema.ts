import { Group } from "src/groups/schemas/group.schema";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {

    @Prop()
    _id: string;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop(() => User)
    friends: User[];

    @Prop(() => Group)
    groups: Group[];
}

export const UserSchema = SchemaFactory.createForClass(User);