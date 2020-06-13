import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group, GroupSchema } from './schemas/group.schema';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]), UsersModule],
    controllers: [GroupsController],
    providers: [GroupsService],
    exports: [TypeOrmModule]
})
export class GroupsModule { }
