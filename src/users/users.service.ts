import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './schemas/user.schema';
import { MongoRepository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private usersRepo: MongoRepository<User>,
        @InjectModel(User.name) private userModel: Model<User>) { }

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
