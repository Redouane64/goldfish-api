import { Controller, Param, Get, NotFoundException, Put, Delete } from "@nestjs/common";
import { User } from "../common/interfaces/user.interface";
import { FriendsService } from "./friends.service";

@Controller("users/:id/friends")
export class FriendsController {

    constructor(private friendsService: FriendsService) { }

    @Get()
    async getFriends(@Param("id") id: string): Promise<User[]> {

        const friends = await this.friendsService.getFriends(id);
        if (!friends) {
            throw new NotFoundException();
        }

        return friends;
    }

    @Put(":friendId")
    async addFriend(@Param() data: { id: string, friendId: string }): Promise<User[]> {
        return await this.friendsService.addFriend(data)
    }

    @Delete(":friendId")
    async deleteFriend(@Param() data: { id: string, friendId: string }): Promise<User[]> {
        return await this.friendsService.deleteFriend(data);
    }

}