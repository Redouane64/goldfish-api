import { Controller, Param, Get, Post, Body, Patch, Delete, Put, NotFoundException } from '@nestjs/common';
import { GroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { Group } from 'src/common/interfaces/group.interface';

@Controller('groups')
export class GroupsController {

    constructor(private groupsService: GroupsService) { }

    @Get()
    getAll(): Promise<Group[]> {
        return this.groupsService.getAll();
    }

    @Get(":id")
    async getOne(@Param("id") id: string): Promise<Group> {
        return this.groupsService.getOne(id);
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
    async addMember(@Param("id") id: string, @Body() data: { userId: string }): Promise<Group> {
        const group = await this.groupsService.addMember(id, data);
        if (!group) {
            throw new NotFoundException();
        }
        return group;
    }

    @Delete(":id")
    async deleteMember(@Param("id") id: string, @Body() data: { userId: string }): Promise<Group> {
        const group = await this.groupsService.deleteMember(id, data);
        if (!group) {
            throw new NotFoundException();
        }
        return group;
    }
}
