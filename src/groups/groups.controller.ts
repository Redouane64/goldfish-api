import { Controller, Param, Get, Post, Body, Patch, Delete, Options, Res } from '@nestjs/common';
import { Group } from './interfaces/group.interface';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsService } from './groups.service';
import { Response } from 'express';

@Controller('groups')
export class GroupsController {

    constructor(private groupsService: GroupsService) { }

    @Get()
    getAll(): Group[] {
        return null;
    }

    @Get(":id")
    getOne(@Param("id") id: string): Group {
        return null;
    }

    @Post()
    create(@Body() data: CreateGroupDto): Group {
        return null;
    }

    @Patch(":id")
    update(@Param("id") id: string, data: UpdateGroupDto): Group {
        return null;
    }

    @Delete(":id")
    delete(@Param("id") id: string): Group {
        return null;
    }

    @Options()
    acceptVerbs(@Res() res: Response): void {
        res.header("allow", "GET, POST, PATCH, DELETE, OPTIONS")
            .status(204)
            .send();
    }
}
