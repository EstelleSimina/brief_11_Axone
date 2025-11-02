import { Controller } from "../libs/Controller";
import { UserRepository } from "../repositories/UserRepository";

export class AuthController extends Controller {
    signUp = async () => {
        // 0.0 REQUEST : Récupérer les données du corps de requête validées par le middleware
        const { email } = this.request.body;

        // 1.1 USER : Vérifier s'il existe déjà un utilisateur avec cet email en base de données
        const userRepository = new UserRepository();
        const existingUser = await userRepository.findByEmail(email);

        if (existingUser) {
        return this.response
            .status(409)
            .json({ message: "Utilisateur déjà existant" });
        }

        this.response.json({
            test:"controller",
        });
    };
}