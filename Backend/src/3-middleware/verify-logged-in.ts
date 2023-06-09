import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import { UnauthorizedErrorModel } from "../4-models/error-models";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction) {

   try {
    const isLoggedIn=await cyber.verifyToken(request)
    if(!isLoggedIn) throw new UnauthorizedErrorModel("You are not logged in")
    next()

   } catch (error) {
    next(error)
   }
    
}

export default verifyLoggedIn;
