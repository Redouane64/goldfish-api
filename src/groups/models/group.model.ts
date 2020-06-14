import { ObjectType, Field } from "@nestjs/graphql";
import { User } from "src/users/models/user.model";

@ObjectType()
export class Group {
    @Field(type => String)
    _id: string;

    @Field(type => String)
    name: string;

    @Field(type => [User])
    members: User[];
}