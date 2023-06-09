import { NextFunction, Request, Response } from "express";

function deleteMessage(request: Request, response: Response, next: NextFunction) {

    console.log("Trying to delete a book!");

    // Transfer flow to next middleware or to controller:
    next();
}

export default deleteMessage;

