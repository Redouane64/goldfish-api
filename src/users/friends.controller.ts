import { Controller, Param, Put, Delete } from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { User } from "src/common/interfaces/user.interface";

@Controller("users/:id/friends")
export class FriendsController {

    constructor(private friendsService: FriendsService) { }

    @Put(":friendId")
    async addFriend(@Param() data: { id: string, friendId: string }): Promise<User> {
        return await this.friendsService.addFriend(data)
    }

    @Delete(":friendId")
    async deleteFriend(@Param() data: { id: string, friendId: string }): Promise<User> {
        return await this.friendsService.deleteFriend(data);
    }

}