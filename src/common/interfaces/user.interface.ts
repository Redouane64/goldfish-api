import { Document } from "mongoose";

export interface User extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    friends: User[]
}