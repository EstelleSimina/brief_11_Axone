import { UsersTypeRow } from "../types/types"

export default class Users {
    protected id?: number;
    protected email: string;
    protected username: string;
    protected password_hash: string;
    protected first_name : string | null;
    protected last_name : string | null;
    protected created_at : Date;

   constructor(
    id: number,
    email: string,
    username: string,
    password_hash: string,
    first_name: string | null,
    last_name : string | null,
    created_at : Date,
   ){
    this.id=id;
    this.email= email;
    this.username = username;
    this.password_hash= password_hash;
    this.first_name= first_name;
    this.last_name= last_name;
    this.created_at= created_at;
   }
    static fromRow(row: UsersTypeRow): Users {
        return new Users(
            row.id, 
            row.email, 
            row.username, 
            row.password_hash, 
            row.first_name,
            row.last_name,
            new Date(row.created_at), // conversion string → Date
        );
    }
}