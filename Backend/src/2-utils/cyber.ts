import { Request } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../4-models/users-model";
import crypto from "crypto";
import RoleModel from "../4-models/role-model";


const jwtSecretKey = "vacations";

function getNewToken(user: UserModel): string {

    delete user.password;
    const container = { user };
    const options = { expiresIn: "3h" };
    const token = jwt.sign(container, jwtSecretKey, options);
    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("authorization");
            if (!header) {
                resolve(false);
                return;
            }
            const token = header.substring(7);
            if (!token) {
                resolve(false);
                return;
            }
            jwt.verify(token, jwtSecretKey, err => {
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err: any) {
            reject(err);
        }
    });
}

async function verifyAdmin(request: Request): Promise<boolean> {

    // First check if user logged in:
    const isLoggedIn = await verifyToken(request);

    // If not logged in:
    if(!isLoggedIn) return false;

    // Extract token: 
    const header = request.header("authorization");
    const token = header.substring(7);

    // Extract container from token:
    const container: any = jwt.decode(token);
    
    // Extract user: 
    const user: UserModel = container.user;

    // Return true if user is admin, otherwise return false:
    return user.role === RoleModel.Admin;
}


const salt = "HellowToEvreyOne";

function hash(plainText: string): string {

    if(!plainText) return null;
 
    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashedText;
}

function getUserIdFromToken(authHeader: string): number {

    const token = authHeader.substring(7);
    // Get container which contains the user:
    const container = jwt.decode(token) as { user: UserModel };
    // Get the user: 
    const user = container.user;
    console.log(user)
    // Get userId: 
    const userId = user.userId;
    console.log("userId"+userId)

    return userId;

}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin,
    hash,
    getUserIdFromToken
};
