/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty } from 'class-validator';
import {
  Entity, Column, PrimaryGeneratedColumn, JoinColumn,
  ManyToOne, CreateDateColumn,
} from 'typeorm';
import User from './user.entity';

@Entity()
export default class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User, (user) => user.id)
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    @IsNotEmpty()
    created: Date;

    @Column()
    @IsNotEmpty()
    createdByIp: string;

    @Column()
    @IsNotEmpty()
    expires: Date;

    @Column({ nullable: true })
    replacedByToken: string;

    @Column({ nullable: true })
    revoked: Date;

    @Column({ nullable: true })
    revokedByIp: string;

    @Column({ nullable: true })
    token: string;
}
