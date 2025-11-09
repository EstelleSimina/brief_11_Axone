import { TokenTypeRow } from "../types/Database"
import { TokenService } from "../services/TokenService"
import crypto from "node:crypto";

export default class Token {
    /** Identifiant en base (optionnel) */
    protected id?: number;
    protected user_id: number;
    protected token: string;
    protected created_at : string;
    protected expires_at : string;

    /**
   * Constructeur privé. Utilisé en interne uniquement.
   * @private
   */
    private constructor(
        user_id: number,
        token: string,
        created_at : string,
        expires_at : string, 
        id?: number,
    ){
        this.id=id;
        this.user_id=user_id;
        this.token=token;
        this.created_at=created_at;
        this.expires_at=expires_at;
    }


    /**
     * Génère un nouveau token pour un utilisateur.
     * Retourne l'instance `Token` (avec le hash prêt à être persisté).
     */
    static create = (userId: number, jwt: string): Token => {
        const hash = crypto.createHash("sha256").update(jwt).digest("hex");
        const created = new Date();
        const expires = new Date(
        created.getTime() + TokenService.getRefreshTokenTTL() * 1000
        );

        return new Token(
        userId,
        hash,
        created.toISOString(),
        expires.toISOString(),
        undefined
        );
    };

    /**
     * Construit un Token à partir d'une ligne retournée par la base de données.
     * @param row - Enregistrement contenant les colonnes attendues
   */
    static fromRow(row: TokenTypeRow): Token {
        return new Token(
            row.user_id,
            row.token,
            row.created_at,
            row.expires_at,
            row.id_token
        );
    }

    /** Re-hashe la valeur brute du jwt (utile pour comparer avec le hash en BDD)
     * @param jwt - Version brute du token
     */
    static hashJwt = (jwt: string): string => {
        return crypto.createHash("sha256").update(jwt).digest("hex");
    };

    setId = (id: number): void => {
        this.id = id;
    };

    getId = (): number | undefined => this.id;

    getUserId = (): number  => this.user_id;
    
    getTokenHash = (): string  => this.token;

    getCreatedAt = (): string => this.created_at;
    
    getExpiresAt = (): string  => this.expires_at;

    isExpired = (): boolean => Date.now() >= Date.parse(this.expires_at);

}