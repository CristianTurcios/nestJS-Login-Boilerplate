import { IsNotEmpty } from 'class-validator';
import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

@Entity()
export default class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    role: string;
}
