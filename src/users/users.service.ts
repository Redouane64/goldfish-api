import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepo: Repository<User>) { }

    getAll(): Promise<User[]> {
        return this.usersRepo.find();
    }

    getOne(id: string): Promise<User | undefined> {
        return this.usersRepo.findOne(id);
    }

    create(data: { firstName: string, lastName: string }): Promise<User> {
        const user = new User();
        user.firstName = data.firstName;
        user.lastName = data.lastName;

        return this.usersRepo.save(user)
    }

    async update(id: string, data: { firstName: string, lastName: string }): Promise<User | undefined> {
        const user = await this.usersRepo.findOne(id);

        if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;

            await this.usersRepo.save(user);
            return user;
        }

        return undefined;
    }

    async delete(id: string): Promise<User | undefined> {
        const user = await this.usersRepo.findOne(id);
        if (user) {
            await this.usersRepo.delete(user);
            return user;
        }
        return undefined;
    }
}
