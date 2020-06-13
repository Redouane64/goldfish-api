import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Group } from "src/groups/entities/group.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToMany(t => User)
    @JoinTable()
    friends: User[];

    @ManyToMany(t => Group)
    groups: Group[];
}