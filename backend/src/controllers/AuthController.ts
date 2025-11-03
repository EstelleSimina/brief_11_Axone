import argon2 from "argon2"
import { Controller } from "../libs/Controller";
import { UserRepository } from "../repositories/UserRepository";
import Users from "../models/Users";

export class AuthController extends Controller {
    signUp = async () => {
        // 0.0 REQUEST : Récupérer les données du corps de requête validées par le middleware
        const { email, password, username } = this.request.body;

        // 1.1 USER : Vérifier s'il existe déjà un utilisateur avec cet email en base de données
        const userRepository = new UserRepository();
        const existingUser = await userRepository.findByEmail(email);

        if (existingUser) {
        return this.response
            .status(409)
            .json({ message: "Un compte est déjà associé à cet email. Veuillez en utiliser un autre ou vous connecter." });
        }


        // 1.2 USER : Vérifier s'il existe déjà un utilisateur avec cet username en base de données
        const existingUserByUsername = await userRepository.findByUsername(username);
        if (existingUserByUsername) {
        return this.response.status(409).json({
            message: `Le nom d'utilisateur "${username}" est déjà utilisé. Veuillez en choisir un autre.`,
        });
        }

        
        // 1.3 USER : Hasher le mot de passe, instancier l'utilisateur et l'enregistrer

        const passwordHash = await argon2.hash(password);
        const user = new Users(email, username, passwordHash);
        const userId = await userRepository.create(user)

        if(!userId) {
            return this.response.status(400).json({message:"Une erreur est survenue lors de la création du compte. Veuillez réessayer plus tard."})
        }


        this.response.json({
            test:"controller",
        });
    };
}