import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController, FriendsController],
    providers: [UsersService, FriendsService],
    exports: [TypeOrmModule, UsersService]
})
export class UsersModule { }
