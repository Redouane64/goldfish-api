import { User } from "./user.interface";

export interface Group {
    id: string;
    name: string;
}

export interface GroupDetails {
    id: string;
    name: string;
    members: User[];
}