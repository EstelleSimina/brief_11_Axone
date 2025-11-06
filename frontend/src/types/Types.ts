// API
export type ApiResponse<TData> = {
    message: string;
    data: TData;
};

// ENTITIES
export type Users = {
    id_user?: number;
    email: string;
    username: string;
    password_hash: string;
    first_name: string | null;
    last_name : string | null;
    created_at : string;
};