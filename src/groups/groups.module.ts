import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupSchema } from './schemas/group.schema';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupsResolver } from './groups.resolver';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]), UsersModule],
    controllers: [],
    providers: [GroupsService, GroupsResolver],
    exports: []
})
export class GroupsModule { }
