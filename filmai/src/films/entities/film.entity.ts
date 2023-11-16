import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Film {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @Column()
    completed: boolean;
}