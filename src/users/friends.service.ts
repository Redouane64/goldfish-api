import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/common/interfaces/user.interface";
import { Model } from "mongoose";

export class FriendsService {

    constructor(
        @InjectModel("User") private users: Model<User>
    ) { }

    async addFriend(data: { id: string, friendId: string }): Promise<User> {
        const user = await this.users.findOne({ _id: data.id }).populate("friends");
        const friend = await this.users.findOne({ _id: data.friendId }).populate("friends");

        if (!user || !friend) {
            return undefined;
        }

        if (data.id === data.friendId) {
            return user;
        }

        user.friends = user.friends.filter(u => u.id !== data.friendId);
        friend.friends = friend.friends.filter(u => u.id !== data.id);

        user.friends.push(friend);
        friend.friends.push(user);

        return await user.save().then(() => friend.save())
    }

    async deleteFriend(data: { id: string, friendId: string }): Promise<User> {
        const user = await this.users.findOne({ _id: data.id }).populate("friends");
        const friend = await this.users.findOne({ _id: data.friendId }).populate("friends");

        if (!user || !friend) {
            return undefined;
        }

        user.friends = user.friends.filter(u => u.id !== data.friendId);
        friend.friends = friend.friends.filter(u => u.id !== data.id);

        return await user.save().then(() => friend.save())
    }
}