import { Injectable } from '@nestjs/common';
import { Group } from 'src/common/interfaces/group.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GroupsService {

    constructor(
        @InjectModel("Group") private groups: Model<Group>,
        private usersService: UsersService
    ) { }

    async getAll(): Promise<Group[]> {
        return await this.groups.find();
    }

    async getOne(id: string): Promise<Group> {
        return await this.groups.findOne({ _id: id }).populate("members");
    }

    createGroup(data: { name: string }): Promise<Group> {
        return new this.groups(data).save();
    }

    async updateGroup(id: string, data: { name: string }): Promise<Group> {
        return this.groups.findOneAndUpdate({ _id: id }, data, { new: false });
    }

    async addMember(id: string, data: { userId: string }): Promise<Group> {

        const group = await this.groups.findOne({ _id: id }).populate("members");
        if (!group) {
            return undefined;
        }

        const member = await this.usersService.getOneWithoutFriends(data.userId);
        if (!member) {
            return undefined;
        }

        // avoid duplicating members.
        group.members = group.members.filter(m => m.id !== data.userId);

        group.members.push(member);
        return await group.save();
    }

    async deleteMember(id: string, data: { userId: string }): Promise<Group> {
        const group = await this.groups.findOne({ _id: id }).populate("members");
        if (!group) {
            return undefined;
        }

        group.members = group.members.filter(m => m.id !== data.userId);

        return await group.save();
    }
}
