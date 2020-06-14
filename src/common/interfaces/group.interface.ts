import { User } from "./user.interface";
import { Document } from "mongoose";

export interface Group extends Document {
    _id: string;
    name: string;
    members: User[];
}