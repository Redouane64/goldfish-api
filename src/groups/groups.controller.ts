import { Controller, Param, Get, Post, Body, Patch, Delete, Put } from '@nestjs/common';
import { GroupDto } from './dto/create-group.dto';
import { GroupsService } from './groups.service';
import { Group } from 'src/common/interfaces/group.interface';
import { User } from 'src/common/interfaces/user.interface';

@Controller('groups')
export class GroupsController {

    constructor(private groupsService: GroupsService) { }

    @Get()
    getAll(): Promise<Group[]> {
        return undefined;
    }

    @Get(":id")
    async getOne(@Param("id") id: string): Promise<Group> {
        return undefined;
    }

    @Post()
    create(@Body() data: GroupDto): Promise<Group> {
        return undefined;
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() data: GroupDto): Promise<Group> {
        return undefined;
    }

    @Put(":id")
    addMember(@Param("id") id: string, @Body() data: { userId: string }): Promise<User[]> {
        return undefined;
    }

    @Delete(":id")
    deleteMember(@Param("id") id: string, @Body() data: { userId: string }): Promise<User[]> {
        return undefined;
    }
}
