import { Resolver, Args, Mutation, Query } from "@nestjs/graphql";
import { Group } from "./models/group.model";
import { GroupsService } from "./groups.service";

@Resolver(() => Group)
export class GroupsResolver {
    constructor(
        private groupsService: GroupsService
    ) { }

    @Query(() => [Group], { name: "groups" })
    async getGroups(): Promise<Group[]> {
        return await this.groupsService.getAll();
    }

    @Query(() => Group, { name: "group" })
    async getGroup(@Args("id") id: string): Promise<Group> {
        return await this.groupsService.getOne(id);
    }

    @Mutation(() => Group, { name: "createGroup" })
    async createGroup(@Args("name") name: string): Promise<Group> {
        return await this.groupsService.createGroup({ name });
    }

    @Mutation(() => Group, { name: "updateGroup" })
    async updateGroup(
        @Args("id") id: string,
        @Args("name") name: string): Promise<Group> {
        return await this.groupsService.updateGroup(id, { name });
    }

    @Mutation(() => Group, { name: "addMember" })
    async addMember(
        @Args("id") id: string,
        @Args("userId") userId: string): Promise<Group> {

        return await this.groupsService.addMember(id, { userId });
    }

    @Mutation(() => Group, { name: "deleteMember" })
    async deleteMember(
        @Args("id") id: string,
        @Args("userId") userId: string): Promise<Group> {

        return await this.groupsService.addMember(id, { userId });
    }
}