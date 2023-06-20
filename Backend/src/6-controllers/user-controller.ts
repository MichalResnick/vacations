import express, {Request,Response,NextFunction } from "express";
import vacationsLogic from "../5-logic/vacations-logic";
import FollowModel from "../4-models/follow-model";
import userLogic from "../5-logic/user-logic";



const router = express.Router();

//add follower
router.post("/followers", async (request: Request, response: Response, next: NextFunction) => {
    try {
    const follower=new FollowModel(request.body)
    const addedFollower=await userLogic.addFollow(follower)
    response.status(201).json(addedFollower)
    }
    catch (err: any) {
        next(err);
    }
});

//get one vacation
router.delete("/followers/:followerId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const followerId = +request.params.followerId;
        await userLogic.deleteFollow(followerId);
        response.sendStatus(204); 
    }
    catch (err: any) {
        next(err);
    }
});

export default router;