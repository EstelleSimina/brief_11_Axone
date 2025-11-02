import { Pool } from "pg";
import { Database } from "./Database"

// =============================================
// CLASSE ABSTRAITE: Repository
// =============================================
// Classe parente pour tous les Repository (ex: UserRepository, SnippetRepository).
// Centralise l'accès à la base de données via un `Pool` de connexions PostgreSQL.
// Évite la duplication de code: Chaque Repository enfant n'aura pas besoin de réimplémenter la connexion.
// Facilite la maintenance: Si tu changes de BDD, tu modifies seulement cette classe.
// =============================================

export abstract class Repository {
    protected pool: Pool;

    constructor() {
        this.pool = Database.getPool();
    }
}