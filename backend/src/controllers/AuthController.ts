import argon2 from "argon2"
import { Controller } from "../libs/Controller";
import { UserRepository } from "../repositories/UserRepository";
import Users from "../models/Users";
import Token from "../models/Token"
import { TokenService } from "../services/TokenService"
import { TokenRepository } from "../repositories/TokenRepository";
import { CookieService } from "../services/CookieService";


/**
 * Contrôleur gérant l'authentification.
 */

export class AuthController extends Controller {
        // Inscription d'un nouvel utilisateur
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

        // 2.1 TOKEN : Signer le jwt et créer une instance du token
        const jwt = TokenService.signRefreshToken({
            sub: String(userId),
        });   
        const token = Token.create(userId, jwt);

           // 2.2 TOKEN : Enregistrer le token
        const tokenRepository = new TokenRepository();
        const tokenId = await tokenRepository.create(token);

        if (!tokenId) {
            return this.response
                .status(400)
                .json({ message: "Création du token impossible" });
            }
        

            // 3 RESPONSE : Attacher le cookie contenant le jwt et répondre
        CookieService.setRefreshCookie(this.response, jwt);

       
        return this.response.status(201).json({
            message: "Inscription réussie",
            data: user.serialize(),
        });
    };





        // Connexion d’un utilisateur existant
    signIn = async () => {
        // 0.0 REQUEST : Récupérer les données du corps de requête validées par le middleware
    const { email, password } = this.request.body;
        // 1.1 USER : Vérifier si un utilisateur avec cet email existe en base de données
    const userRepository = new UserRepository();
    const existingUser = await userRepository.findByEmail(email);
    const existingUserId = existingUser?.getId();

    if (!existingUser || !existingUserId) {
      return this.response
        .status(401)
        .json({ message: "Email ou mot de passe invalide" });
    }

    // 1.2 USER : Vérifier la concordance entre le mot de passe soumis et le hash enregistré
    const validPassword = await argon2.verify(
      existingUser.getPasswordHash(),
      password
    );

    if (!validPassword) {
      return this.response
        .status(401)
        .json({ message: "Email ou mot de passe invalide" });
    }

    return this.response.json ({
        workinprogress: "gg",
    })

};

}



        