import { UsersDbRow } from "../types/Database"

export default class Users {
    protected id_user?: number;
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
    first_name: string | null = null,
    last_name : string | null = null,
    created_at: Date = new Date(),
    id_user?: number,
   ){
    this.id_user=id_user;
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
            row.id_user, 
        );
    }

    serialize = (): Record<string, string | number | undefined> => {
        return {
            email: this.email,
            username: this.username,
            created_at: this.created_at.toISOString(),
        };
    };

    setId = (id: number): void => {
        this.id_user = id;
    };

    getId = (): number | undefined => this.id_user;

    getEmail = (): string => this.email;

    getUsername = (): string => this.username;

    getPasswordHash = (): string => this.password_hash;

    getFirstName = (): string | null => this.first_name; 

    getLastName = (): string | null => this.last_name;

    getCreatedAt = (): Date => this.created_at; 

}