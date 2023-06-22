import express, {Request,Response,NextFunction } from "express";
import UserModel from "../4-models/users-model";
import authLogic from "../5-logic/auth-logic";
import CredentialsModel from "../4-models/credentials-model";

const router = express.Router(); // Capital R

//Register
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body);
        const token = await authLogic.register(user);
        response.status(201).json(token);
    }
    catch(err: any) {
        next(err);
    }
});

//Register
router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authLogic.login(credentials);
        response.json(token);
    }
    catch(err: any) {
        next(err);
    }
});

//Check if email is exists- to show the error in the frontend
router.get("/auth/:email", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const exists = await authLogic.isEmailAddressTaken(request.params.email);
        response.json(exists);
    }
    catch (err: any) {
        next(err); 
    }
});


export default router;