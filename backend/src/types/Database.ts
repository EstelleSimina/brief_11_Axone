export interface UsersDbRow {
    id_user: number;
    email: string;
    username: string;
    password_hash: string;
    first_name: string | null;
    last_name : string | null;
    created_at : string;
}

export interface TokenTypeRow {
    id_token: number;
    user_id: number;
    token: string;
    created_at : string;
    expires_at : string;
}