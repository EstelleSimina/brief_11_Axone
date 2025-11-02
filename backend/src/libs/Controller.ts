import { Request, Response } from "express";

export abstract class Controller {
    protected request : Request;
    // réponse HTTP à envoyer
    protected response: Response;

    // initialise le contrôleur avec la requête et la réponse 
    constructor(request: Request, response: Response){
        this.request = request;
        this.response = response;
    }
}

