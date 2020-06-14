import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field(type => String)
    _id: string;

    @Field(type => String)
    firstName: string;

    @Field(type => String)
    lastName: string;

    @Field(type => [User])
    friends: User[];
}