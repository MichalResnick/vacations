import express, { Request, Response, NextFunction } from "express";
import logic from "../5-logic/logic";
import vacationLogic from "../5-logic/vacation-logic";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/_____
router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
    const vacations=await vacationLogic.getAllVacations()
    response.json(vacations)
    }
    catch (err: any) {
        next(err);
    }
});

export default router;