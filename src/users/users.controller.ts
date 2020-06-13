import { Controller, Get, Post, Delete, Param, Body, Patch, Options, Res, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { Response } from 'express';
import { get } from 'http';

@Controller("users")
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.getAll();
    }

    @Get(":id")
    async getOne(@Param('id') id: string): Promise<User> {
        const user = await this.usersService.getOne(id);
        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() data: UserDto): Promise<User> {

        const updatedUser = await this.usersService.update(id, data);
        if (!updatedUser) {
            throw new NotFoundException();
        }

        return updatedUser;
    }

    @Post()
    create(@Body() data: UserDto): Promise<User> {
        return this.usersService.create(data);
    }

    @Delete(":id")
    delete(@Param("id") id: string): User {
        const user = this.usersService.delete(id);
        if (!user) {
            throw new NotFoundException();
        }

        return undefined;
    }


    @Options()
    acceptVerbs(@Res() res: Response): void {
        res.header("Allow", "GET, POST, PATCH, DELETE, OPTIONS")
            .status(204)
            .send();
    }

}