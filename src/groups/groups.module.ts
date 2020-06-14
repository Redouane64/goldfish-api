import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { GroupSchema } from './schemas/group.schema';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Group', schema: GroupSchema }]), UsersModule],
    controllers: [GroupsController],
    providers: [GroupsService],
    exports: []
})
export class GroupsModule { }
