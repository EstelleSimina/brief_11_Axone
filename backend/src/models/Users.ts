import { UsersDbRow } from "../types/Database"

export default class Users {
    protected id?: number;
    protected email: string;
    protected username: string;
    protected password_hash: string;
    protected first_name : string | null;
    protected last_name : string | null;
    protected created_at : Date;

   constructor(
    email: string,
    username: string,
    password_hash: string,
    first_name: string | null,
    last_name : string | null,
    created_at : Date,
    id: number,
   ){
    this.id=id;
    this.email= email;
    this.username = username;
    this.password_hash= password_hash;
    this.first_name= first_name;
    this.last_name= last_name;
    this.created_at= created_at;
   }
    static fromRow(row: UsersDbRow): Users {
        return new Users(
            row.email, 
            row.username, 
            row.password_hash, 
            row.first_name,
            row.last_name,
            new Date(row.created_at), // conversion string → Date
            row.id, 
        );
    }

    getId = (): number | undefined => this.id;

    getEmail = (): string => this.email;

    getUsername = (): string => this.username;

    getPasswordHash = (): string => this.password_hash;

    getFirstName = (): string | null => this.first_name; 

    getLastName = (): string | null => this.last_name;

    getCreatedAt = (): Date => this.created_at; 

}