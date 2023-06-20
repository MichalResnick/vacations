import express, { Request, Response, NextFunction } from "express";
import logic from "../5-logic/user-logic";
import VacationModel from "../4-models/vacation-model";
import verifyAdmin from "../3-middleware/verify-admin";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import path from "path";
import adminLogic from "../5-logic/admin-logic";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/_____
// router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//     const vacations=await adminLogic.getAllVacations()
//     response.json(vacations)
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

//add vacation
router.post("/vacations",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
    request.body.image=request.files?.image
    const vacation=new VacationModel(request.body)
    const addedVacation=await adminLogic.addVacation(vacation)
    response.status(201).json(addedVacation)
    }
    catch (err: any) {
        next(err);
    }
});

//update vacation
router.put("/vacations/:vacationId([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
    request.body.vacationId=+request.params.vacationId
    request.body.image=request.files?.image
    const vacation=new VacationModel(request.body)
    const updatedVacation=await adminLogic.updateVacation(vacation)
    response.status(201).json(updatedVacation)
    }
    catch (err: any) {
        next(err);
    }
});

// //Get Picture
// router.get("/vacations/images/:imageName",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
//     try {
//      const imageName=request.params.imageName
//      const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);
//      response.sendFile(absolutePath);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

//Delete vacation
router.delete("/vacations/:vacationId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        await adminLogic.deleteVacation(vacationId);
        response.sendStatus(204); 
    }
    catch (err: any) {
        next(err); 
    }
});

export default router;