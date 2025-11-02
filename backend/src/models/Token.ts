import { TokenTypeRow } from "../types/types"

export default class Token {
    protected id?: number;
    protected user_id: number;
    protected token: string;
    protected created_at : Date;
    protected expires_at : Date;

    private constructor(
        id: number,
        user_id: number,
        token: string,
        created_at : Date,
        expires_at : Date,
    ){
        this.id=id;
        this.user_id=user_id;
        this.token=token;
        this.created_at=created_at;
        this.expires_at=expires_at;
    }
    static fromRow(row: TokenTypeRow): Token {
        return new Token(
            row.id,
            row.user_id,
            row.token,
            new Date(row.created_at), // conversion string → Date
            new Date(row.expires_at)
        );
    }
}