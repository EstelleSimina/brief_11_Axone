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

        //  2.1 ROTATION TOKEN : Récupérer le token existant de l’utilisateur en base de données
    const tokenRepository = new TokenRepository();
    const existingToken = await tokenRepository.findByUserId(existingUserId); 
    
        // 2.2 ROTATION TOKEN : Signer le nouveau jwt et créer une instance du token
    const jwt = TokenService.signRefreshToken({
      sub: String(existingUserId),
    });
    const freshToken = Token.create(existingUserId, jwt);

        // 2.3 ROTATION TOKEN : Si un token existe, on le remplace, sinon on ajoute un nouveau
    let replacingTokenId = null;

    if (existingToken) {
      replacingTokenId = await tokenRepository.replaceForUser(freshToken);
    } else {
      replacingTokenId = await tokenRepository.create(freshToken);
    }

    if (!replacingTokenId) {
      return this.response
        .status(400)
        .json({ message: "Impossible de créer ou remplacer le token" });
    }

    // 3 RESPONSE : Attacher le cookie contenant le jwt et répondre
    CookieService.setRefreshCookie(this.response, jwt);

    return this.response.status(200).json({
      message: "Connexion réussie",
      data: existingUser.serialize(),
    });
};
}



        