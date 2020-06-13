import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FriendsController } from './friends.controller';
import { FriendsService } from './friends.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schemas/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UsersController, FriendsController],
    providers: [UsersService, FriendsService],
    exports: [UsersService]
})
export class UsersModule { }
