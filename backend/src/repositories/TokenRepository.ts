import { Repository } from "../libs/Repository";
import Token from "../models/Token";
import { TokenTypeRow } from "../types/Database";

/**
 * Repository pour les opérations CRUD liées aux tokens.
 *
 * Toutes les méthodes retournent `null` en cas d'erreur ou si la ressource
 * n'existe pas; la logique applicative (controllers/services) gère les
 * réponses HTTP appropriées.
 */
export class TokenRepository extends Repository {
   /**
   * Crée un token en base.
   * @param token - Instance `Token` (hash et dates déjà calculés)
   * @returns l'ID inséré ou `null` en cas d'erreur
   */
  create = async (token: Token): Promise<number | null> => {
    const query = {
      name: "create-token",
      text: `INSERT INTO public.token (user_id, token, created_at, expires_at)
      VALUES ($1, $2, $3, $4)
      RETURNING id_token
      `,
      values: [
        token.getUserId(),
        token.getTokenHash(),
        token.getCreatedAt(),
        token.getExpiresAt()
      ],
    };

    try {
      const result = await this.pool.query<{ id_token: number }>(query);

      return result.rows[0].id_token;
    } catch (error) {
      console.log(error);
    }

    return null;
  };
}