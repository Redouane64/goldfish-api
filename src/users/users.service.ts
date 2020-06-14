import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/interfaces/user.interface';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel("User") private usersRepo: Model<User>
    ) { }

    async getAll(): Promise<User[]> {
        return await this.usersRepo.find();
    }

    async getOne(id: string): Promise<User> {
        return await this.usersRepo.findOne({ _id: id }).populate("friends");
    }

    create(data: { firstName: string, lastName: string }): Promise<User> {
        const user = new this.usersRepo(data);
        return user.save();
    }

    async update(id: string, data: { firstName: string, lastName: string }): Promise<User> {
        return await this.usersRepo.findByIdAndUpdate(id, data, { new: false });
    }

    async delete(id: string): Promise<User> {
        return await this.usersRepo.findByIdAndRemove(id);
    }
}
