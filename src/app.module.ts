import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    GroupsModule,
    MongooseModule.forRoot("mongodb://localhost/Goldfish")
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
