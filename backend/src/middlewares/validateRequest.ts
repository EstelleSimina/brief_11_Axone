import { NextFunction, Request, Response } from "express";
import { z } from "zod";

// =============================================
// MIDDLEWARE: validateRequest
// =============================================
// objectif: Valider les données entrantes d'une requête HTTP avant qu'elles n'atteignent le contrôleur.
// Utilise la librairie Zod pour définir des schémas de validation.
// =============================================

export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Déclare une variable pour stocker le schéma Zod.
    // `null` par défaut car on ne sait pas encore quel schéma appliquer.
    let schema: z.ZodTypeAny | null = null;

    // Récupère la méthode HTTP (GET, POST, etc.) et la convertit en majuscules. Exemple: "post" → "POST"
    const methodKey = req.method.toUpperCase()

    // Récupère le chemin de la route (ex: "/signup"). 
    // `req.route?.path` peut être undefined si la route n'est pas trouvée, donc on utilise `|| ""` pour éviter les erreurs.
    const pathKey = req.route?.path || "";

    
    // =============================================
    // SÉLECTION DU SCHÉMA EN FONCTION DE LA ROUTE
    // =============================================
    if (methodKey === "POST" && pathKey === "/signup") {
        schema = signUpSchema;
    }

    // CAS 1: AUCUN SCHÉMA TROUVÉ
    // Si aucune route ne correspond (ex: GET /signup), on passe directement au prochain middleware/contrôleur.
    if (!schema) return next()

    // CAS 2: SCHÉMA TROUVÉ → VALIDATION
    const parsed = schema.safeParse(req.body);

    // Si la validation échoue...
    if (!parsed.success) {
        const message = parsed.error.issues[0]?.message || "Données invalides";
        return res.status(400).json({ message });
    }

    // CAS 3: VALIDATION RÉUSSIE
    // Si la validation passe, on écrase `req.body` avec les données "nettoyées" et typées par Zod (`parsed.data`).
    req.body = parsed.data;

    // Passe au middleware/contrôleur suivant.
    next();
};


// =============================================
// SCHÉMAS ZOD
// =============================================
// Définition des règles de validation pour chaque route.
// =============================================
const signUpSchema = z
    .object({
        email: z.email("Format d'email invalide"),
        pseudo: z
            .string({error:"Pseudo requis"})
            .min(3, "Pseudo trop court (3 caractères min"),
        password: z
            .string({error:"Mot de passe requis"})
            .min(8, "Mot de passe trop court (8 caractères min)"),
        passwordVerify: z.string({error:"Mot de passe requis"}),
    })
    .refine((data) => data.password === data.passwordVerify, { //on vérifie que `password` et `passwordVerify` sont identiques.
        message: "Confirmation du mot de passe est erronée",
        path: ['passwordVerify']
    });
