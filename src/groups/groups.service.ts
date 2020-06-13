import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/common/interfaces/user.interface';
import { GroupDetails } from 'src/common/interfaces/group.interface';

@Injectable()
export class GroupsService {

    constructor(
        @InjectRepository(Group)
        private groupsRepo: Repository<Group>,
        private usersService: UsersService
    ) { }

    getAll(): Promise<Group[]> {
        return this.groupsRepo.find();
    }

    getOne(id: string): Promise<GroupDetails> {
        return this.groupsRepo.findOne(id, { relations: ["members"] });
    }

    createGroup(data: { name: string }): Promise<Group> {
        const group = new Group();
        group.name = data.name;

        return this.groupsRepo.save(group);
    }

    async updateGroup(id: string, data: { name: string }): Promise<Group | undefined> {
        const group = await this.groupsRepo.findOne(id);
        if (!group) {
            return undefined;
        }

        group.name = data.name;
        await this.groupsRepo.save([group]);

        return group;
    }

    async addMember(data: { userId: string, groupId: string }): Promise<User[]> {
        const group = await this.groupsRepo.findOne(data.groupId, { relations: ["members"] });

        if (!group) {
            return undefined;
        }

        const user = await this.usersService.getOne(data.userId);
        if (!user) {
            return undefined;
        }

        // avoid group member duplication.
        group.members = group.members.filter(m => m.id !== user.id);
        group.members.push(user);

        await this.groupsRepo.save([group]);
        return group.members;
    }

    async deleteMember(data: { userId: string, groupId: string }): Promise<User[]> {
        const member = await this.usersService.getOne(data.userId);

        const group = await this.groupsRepo.findOne(data.groupId, { relations: ["members"] });

        group.members = group.members.filter(m => m.id !== member.id);
        await this.groupsRepo.save([group]);

        return group.members;
    }
}
