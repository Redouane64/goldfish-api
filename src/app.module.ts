import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path';
@Module({
  imports: [
    UsersModule,
    GroupsModule,
    MongooseModule.forRoot("mongodb://localhost:27017/Goldfish"),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
