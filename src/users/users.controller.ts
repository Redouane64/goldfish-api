import { Controller, Get, Post, Delete, Param, Body, Patch, Options, Req, Res, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller("users")
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    getAll(): User[] {
        return this.usersService.getAll();
    }

    @Get(":id")
    getOne(@Param('id') id: string): User {
        const user = this.usersService.getOne(id);
        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() data: UpdateUserDto): User {
        const user = <User>{ name: data.name };
        const updatedUser = this.usersService.update(id, user);
        if (!updatedUser) {
            throw new NotFoundException();
        }

        return updatedUser;
    }

    @Post()
    create(@Body() data: CreateUserDto): User {
        const user = <User>{ id: data.id, name: data.name };
        return this.usersService.create(user);
    }

    @Delete(":id")
    delete(@Param("id") id: string): User {
        const user = this.usersService.delete(id);
        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    @Options()
    acceptVerbs(@Res() res: Response): void {
        res.header("allow", "GET, POST, PATCH, DELETE, OPTIONS")
            .status(204)
            .send();
    }
}