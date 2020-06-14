import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { FriendsService } from './friends.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { UsersResolver } from './users.resolver';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [],
    providers: [UsersService, FriendsService, UsersResolver],
    exports: [UsersService]
})
export class UsersModule { }
