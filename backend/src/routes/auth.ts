import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const authRoute = Router ()

// route pour l'inscription 
authRoute.post('/signup', (req, res) => {
    new AuthController(req, res).signUp();
})
// la route sera donc /auth/signup