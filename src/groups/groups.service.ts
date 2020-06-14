import { Injectable } from '@nestjs/common';
import { Group } from 'src/common/interfaces/group.interface';
import { User } from 'src/common/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GroupsService {

    constructor(
        @InjectModel("Group") private usersRepo: Model<Group>
    ) { }

    getAll(): Promise<Group[]> {
        return undefined;
    }

    getOne(): Promise<Group> {
        return undefined;
    }

    createGroup(): Promise<Group> {
        return undefined;
    }

    async updateGroup(): Promise<Group | undefined> {
        return undefined;
    }

    async addMember(): Promise<User[]> {
        return undefined;
    }

    async deleteMember(): Promise<User[]> {
        return undefined;
    }
}
