import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity()
export class Group {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToMany(t => User)
    @JoinTable()
    members: User[];
}