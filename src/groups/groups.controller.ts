import { Controller, Param, Get, Post, Body, Patch, Delete, NotFoundException, Put } from '@nestjs/common';
import { GroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { Group } from './schemas/group.schema';
import { User } from 'src/users/schemas/user.schema';

@Controller('groups')
export class GroupsController {

    constructor(private groupsService: GroupsService) { }

    @Get()
    getAll(): Promise<Group[]> {
        return this.groupsService.getAll();
    }

    @Get(":id")
    async getOne(@Param("id") id: string): Promise<Group> {
        const group = await this.groupsService.getOne(id);
        if (!group) {
            throw new NotFoundException();
        }

        return group;
    }

    @Post()
    create(@Body() data: GroupDto): Promise<Group> {
        return this.groupsService.createGroup(data);
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() data: GroupDto): Promise<Group> {
        const group = await this.groupsService.updateGroup(id, data);
        if (!group) {
            throw new NotFoundException();
        }

        return group;
    }

    @Put(":id")
    addMember(@Param("id") id: string, @Body() data: { userId: string }): Promise<User[]> {
        return this.groupsService.addMember({ groupId: id, userId: data.userId });
    }

    @Delete(":id")
    deleteMember(@Param("id") id: string, @Body() data: { userId: string }): Promise<User[]> {
        return this.groupsService.deleteMember({ groupId: id, userId: data.userId });
    }
}
