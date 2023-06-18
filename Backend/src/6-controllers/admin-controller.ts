import express, { Request, Response, NextFunction } from "express";
import logic from "../5-logic/logic";
import vacationLogic from "../5-logic/admin-logic";
import VacationModel from "../4-models/vacation-model";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";

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

//add vacation
router.post("/vacations",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try {
    request.body.image=request.files?.image
    const vacation=new VacationModel(request.body)
    const addedVacation=await vacationLogic.addVacation(vacation)
    response.status(201).json(addedVacation)
    }
    catch (err: any) {
        next(err);
    }
});

export default router;