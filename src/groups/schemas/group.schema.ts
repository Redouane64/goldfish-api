import { User } from "src/users/schemas/user.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Group extends Document {

    @Prop()
    _id: string;

    @Prop()
    name: string;

    @Prop(() => User)
    members: User[];
}

export const GroupSchema = SchemaFactory.createForClass(Group)