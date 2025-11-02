export interface UsersTypeRow {
    id: number;
    email: string;
    username: string;
    password_hash: string;
    first_name: string | null;
    last_name : string | null;
    created_at : Date;
}

export interface TokenTypeRow {
    id: number;
    user_id: number;
    token: string;
    created_at : Date;
    expires_at : Date;
}