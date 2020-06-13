import { Controller, Param, Get, Post, Body, Patch, Delete, Options, Res, NotFoundException, Put } from '@nestjs/common';
import { Group, GroupDetails } from '../common/interfaces/group.interface';
import { GroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { Response } from 'express';
import { User } from 'src/common/interfaces/user.interface';

@Controller('groups')
export class GroupsController {

    constructor(private groupsService: GroupsService) { }

    @Get()
    getAll(): Promise<Group[]> {
        return this.groupsService.getAll();
    }

    @Get(":id")
    async getOne(@Param("id") id: string): Promise<GroupDetails> {
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

    @Options()
    acceptVerbs(@Res() res: Response): void {
        res.header("Allow", "GET, POST, PATCH, OPTIONS")
            .status(204)
            .send();
    }
}
