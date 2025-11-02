import { Controller } from "../libs/Controller";

export class AuthController extends Controller {
    signUp = () => {
        this.response.json({
            test:"controller",
        });
    };
}