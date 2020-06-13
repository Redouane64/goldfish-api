import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Group } from './groups/entities/group.entity';

@Module({
  imports: [
    UsersModule,
    GroupsModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "Goldfish",
      synchronize: true,
      logging: true,
      entities: [
        User, Group
      ],
      migrations: ["./migration/*.ts"],
      cli: {
        "migrationsDir": "src/migration"
      }
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
