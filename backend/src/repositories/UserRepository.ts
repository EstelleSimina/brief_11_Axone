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

  /**
   * Récupère un utilisateur par son username.
   * @param username - username cherché
   * @returns l'instance `User` ou `null` si non trouvée / en cas d'erreur
   */
  findByUsername = async (username: string): Promise<Users | null> => {
      const query = {
        text: "SELECT * FROM public.users WHERE username = $1",
        values: [username],
      };

      try {
          const result = await this.pool.query<UsersDbRow>(query);
          return result.rowCount ? Users.fromRow(result.rows[0]) : null;
      } catch (error) {
          console.error(error);
          return null;
      }
  };



  /**
   * Crée un nouvel utilisateur en base.
   * @param user - Instance `User` contenant les valeurs à insérer
   * @returns l'ID inséré ou `null` en cas d'erreur
   */
  create = async (user: Users): Promise<number | null> => {
    const query = {
      name: "create-user",
      text: `INSERT INTO public.users (email, username, password_hash, first_name, last_name, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_user
      `,
      values: [
        user.getEmail(),
        user.getUsername(),
        user.getPasswordHash(),
        user.getFirstName(),
        user.getLastName(),
        user.getCreatedAt(),
      ],
    };

    try {
      const result = await this.pool.query<{ id_user: number }>(query);

      return result.rows[0].id_user;
    } catch (error) {
      console.log(error);
    }

    return null;
  };


}