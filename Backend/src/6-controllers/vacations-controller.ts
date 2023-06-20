import express, {Request,Response,NextFunction } from "express";
import vacationsLogic from "../5-logic/vacations-logic";



const router = express.Router();

router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
    const header = request.header("authorization");
    const vacations=await vacationsLogic.getAllVacations(header)
    response.json(vacations)
    }
    catch (err: any) {
        next(err);
    }
});

export default router;