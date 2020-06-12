import { Controller, Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller("users")
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    getAll(): User[] {
        return this.usersService.getAll();
    }

    @Get(":id")
    getOne(@Param('id') id: string): User {
        return this.usersService.getOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() data: UpdateUserDto): User {
        const user = <User>{ name: data.name };
        return this.usersService.update(id, user);
    }

    @Post()
    create(@Body() data: CreateUserDto): User {
        const user = <User>{ id: data.id, name: data.name };
        return this.usersService.create(user);
    }

    @Delete(":id")
    delete(@Param("id") id: string): User {
        return this.usersService.delete(id);
    }
}