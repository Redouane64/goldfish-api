import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/interfaces/user.interface';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel("User") private users: Model<User>
    ) { }

    async getAll(includeFriends = false): Promise<User[]> {
        if (includeFriends) {
            return await this.users.find().populate("friends");
        }
        return await this.users.find();
    }

    async getOne(id: string): Promise<User> {
        return await this.users.findOne({ _id: id }).populate("friends");
    }

    async getOneWithoutFriends(id: string): Promise<User> {
        return await this.users.findOne({ _id: id });
    }

    create(data: { firstName: string, lastName: string }): Promise<User> {
        const user = new this.users(data);
        return user.save();
    }

    async update(id: string, data: { firstName: string, lastName: string }): Promise<User> {
        return await this.users.findByIdAndUpdate(id, data, { new: true }).populate("friends");
    }

    async delete(id: string): Promise<User> {
        return await this.users.findByIdAndRemove(id);
    }
}
