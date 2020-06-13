import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

export class FriendsService {

    constructor(@InjectRepository(User) private usersRepo: Repository<User>) { }

    async getFriends(userId: string): Promise<User[] | undefined> {
        const user = await this.usersRepo.findOne(userId, { relations: ["friends"] });

        if (!user) {
            return undefined;
        }

        return user.friends;
    }

    async addFriend(data: { id: string, friendId: string }): Promise<User[]> {
        const user = await this.usersRepo.findOne(data.id, { relations: ["friends"] });
        const friend = await this.usersRepo.findOne(data.friendId, { relations: ["friends"] });

        // avoid friendship duplication.
        user.friends = user.friends.filter(u => {
            u.id !== friend.id
        });

        friend.friends = friend.friends.filter(u => {
            u.id !== user.id
        });

        user.friends.push(friend);
        friend.friends.push(user);

        await this.usersRepo.save([user, friend]);
        return (await this.usersRepo.findOne(data.id, { relations: ["friends"] })).friends;
    }

    async deleteFriend(data: { id: string, friendId: string }): Promise<User[]> {
        const user = await this.usersRepo.findOne(data.id, { relations: ["friends"] });
        const friend = await this.usersRepo.findOne(data.friendId, { relations: ["friends"] });

        user.friends = user.friends.filter(u => {
            u.id !== friend.id
        });

        friend.friends = friend.friends.filter(u => {
            u.id !== user.id
        });

        await this.usersRepo.save([user, friend]);

        return user.friends;
    }
}