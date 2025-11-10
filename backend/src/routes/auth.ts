import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateRequest } from "../middlewares/validateRequest";

export const authRoute = Router ()

// route pour l'inscription 
    authRoute.post('/signup', validateRequest, (req, res) => {
        new AuthController(req, res).signUp();
    });
// la route sera donc /auth/signup

// route pour la connexion 
    authRoute.post('/signin', validateRequest, (req, res) => {
        new AuthController(req, res).signIn()    
});
// la route sera donc /auth/signin
