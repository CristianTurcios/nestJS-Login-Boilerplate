
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Role {
    id: string;
    role: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: JSON;
    createdAt?: Date;
    updatedAt?: Date;
    acceptTerms: boolean;
    isVerified: boolean;
}

export interface IQuery {
    User(id: string): User | Promise<User>;
    Users(): User[] | Promise<User[]>;
    Role(id: number): Role | Promise<Role>;
    Roles(): Role[] | Promise<Role[]>;
}

export interface IMutation {
    postUser(firstName: string, lastName: string, email: string, password: string, confirmPassword: string, acceptTerms: boolean, role: number): User | Promise<User>;
    deleteUser(id: string): User | Promise<User>;
    updateUser(id: string, email?: string, firstName?: string, lastName?: string, role?: number, acceptTerms?: boolean): User | Promise<User>;
    postRole(role: string): Role | Promise<Role>;
    deleteRole(id: number): Role | Promise<Role>;
    updateRole(id: number, role: string): Role | Promise<Role>;
}

export type JSON = any;
export type Any = any;
export type Upload = any;
