import express, { Request, Response, NextFunction } from "express";
import vacationsLogic from "../5-logic/vacations-logic";
import path from "path";
import cyber from "../2-utils/cyber";



const router = express.Router();
//get all vacations
router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const header = request.header("authorization");
        const userId = cyber.getUserIdFromToken(header);
        const vacations = await vacationsLogic.getAllVacations(userId)
        response.json(vacations)
    }
    catch (err: any) {
        next(err);
    }
});

//get one vacation
router.get("/vacations/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId
        const vacation = await vacationsLogic.getOneVacation(vacationId)
        response.json(vacation)
    }
    catch (err: any) {
        next(err);
    }
});

//Get Picture
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});


export default router;