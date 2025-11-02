import { Repository } from "../libs/Repository";
import Users from "../models/Users";
import { UsersDbRow } from "../types/Database";

/**
 * Repository pour les opérations CRUD liées aux utilisateurs.
 *
 * Toutes les méthodes retournent `null` en cas d'erreur ou si la ressource
 * n'existe pas; la logique applicative (controllers/services) gère les
 * réponses HTTP appropriées.
 */
export class UserRepository extends Repository {
  
  /**
   * Récupère un utilisateur par son email.
   * @param email - Email cherché
   * @returns l'instance `User` ou `null` si non trouvée / en cas d'erreur
   */
  findByEmail = async (email: string): Promise<Users | null> => {
    const query = {
      name: "find-user-by-email",
      text: "SELECT * FROM public.users WHERE email = $1",
      values: [email],
    };

    try {
      const result = await this.pool.query<UsersDbRow>(query);

      if (result.rowCount === 0) return null;

      const user = Users.fromRow(result.rows[0]);

      return user;
    } catch (error) {
      console.log(error);
    }

    return null;
  };
}