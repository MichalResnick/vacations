import express, {Request,Response,NextFunction } from "express";
import vacationsLogic from "../5-logic/vacations-logic";
import FollowModel from "../4-models/follow-model";
import userLogic from "../5-logic/user-logic";
import cyber from "../2-utils/cyber";



const router = express.Router();

//add follower
router.post("/followers/:vacationId", async (request: Request, response: Response, next: NextFunction) => {

    try {
        const header = request.header("authorization");
        const userId = cyber.getUserIdFromToken(header);
        const vacationId = +request.params.vacationId;
        const follow = new FollowModel(userId, vacationId);
        const addedFollow = await userLogic.addFollow(follow);
        response.status(201).json(addedFollow);  // status: 201 - Created
    }
    catch (err: any) {
        next(err);
    }
});

//UnFollowe
router.delete("/followers/:vacationId", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.header("authorization");
        const userId = cyber.getUserIdFromToken(authHeader);
        const vacationId = +request.params.vacationId;
        const deletedFollow= new FollowModel(userId,vacationId)
        await userLogic.deleteFollow(deletedFollow)
        response.sendStatus(204); 
    }
    catch (err: any) {
        next(err);
    }
});

export default router;