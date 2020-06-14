import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { User } from "./models/user.model";
import { UsersService } from "./users.service";
import { FriendsService } from "./friends.service";

@Resolver(() => User)
export class UsersResolver {

    constructor(
        private usersService: UsersService,
        private friendsService: FriendsService
    ) { }

    @Query(() => User, { name: "user" })
    async getUser(@Args("id") id: string): Promise<User> {
        return await this.usersService.getOne(id);
    }

    @Query(() => [User], { name: "users" })
    async getUsers(): Promise<User[]> {
        return await this.usersService.getAll(true);
    }

    @Mutation(() => User, { name: "create" })
    async createUser(@Args("firstName") firstName: string, @Args("lastName") lastName: string): Promise<User> {
        return await this.usersService.create({ firstName, lastName });
    }

    @Mutation(() => User, { name: "update" })
    async updateUser(
        @Args("id") id: string,
        @Args("firstName") firstName: string,
        @Args("lastName") lastName: string): Promise<User> {
        return this.usersService.update(id, { firstName, lastName });
    }

    @Mutation(() => User, { name: "delete" })
    async deleteUser(
        @Args("id") id: string,
    ): Promise<User> {
        return await this.deleteUser(id);
    }

    @Mutation(() => User, { name: "friend" })
    async friend(
        @Args("id") id: string,
        @Args("friendId") friendId: string,
    ): Promise<User> {
        return this.friendsService.addFriend({ id, friendId });
    }

    @Mutation(() => User, { name: "unfriend" })
    async unfriend(
        @Args("id") id: string,
        @Args("friendId") friendId: string,
    ): Promise<User> {
        return this.friendsService.deleteFriend({ id, friendId });
    }
}