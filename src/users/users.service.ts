import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: "201",
            name: "Jack Black",
            createdAt: Date()
        }
    ]

    getAll(): User[] {
        return this.users;
    }

    getOne(id: string): User | undefined {
        return this.users.find(u => u.id === id);
    }

    create(user: User): User {
        user.createdAt = Date();
        this.users.push(user);
        return user;
    }

    update(id: string, user: User): User | undefined {
        const userToUpdate: User | undefined = this.users.find(u => u.id === id);
        if (userToUpdate) {
            userToUpdate.name = user.name;
            return userToUpdate;
        }

        return undefined;
    }

    delete(id: string): User | undefined {
        const userToDelete: User | undefined = this.users.find(u => u.id === id);
        if (userToDelete) {
            const idx = this.users.indexOf(userToDelete);
            const deleted: User[] = this.users.splice(idx, 1);

            return deleted[0];
        }

        return undefined;
    }
}
