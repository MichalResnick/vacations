import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import FollowModel from "../4-models/follow-model";
import exp from "constants";

//follow
async function addFollow(follow:FollowModel):Promise<FollowModel>{
    const err=follow.validate()
    if(err) throw new ValidationErrorModel(err)

    const existingFollow = await getFollowByUserAndVacation(follow.userId, follow.vacationId);
    if (existingFollow) {
        throw new Error("You are already following this vacation.");
    }
    
    const sql=`INSERT INTO followers VALUES(DEFAULT,?,?) `
    const values=[follow.userId,follow.vacationId]

    await dal.execute(sql,values)
    
    return follow

}

//Unfollow
async function deleteFollow(follow: FollowModel): Promise<void> {

    // delete the follower connection in the DB
    const sql = `DELETE FROM followers WHERE userId = ? AND vacationId =?`;

    const values=[follow.userId,follow.vacationId]

    const info:OkPacket=await dal.execute(sql,values)

    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(follow.vacationId);
};

async function getFollowByUserAndVacation(userId: number, vacationId: number): Promise<FollowModel | null> {
    const sql = "SELECT * FROM followers WHERE userId = ? AND vacationId = ?";
    const values = [userId, vacationId];

    const result = await dal.execute(sql, values);

    // If a follow relationship exists, return it; otherwise, return null
    return result.length ? result[0] : null;
}

export default {
    addFollow,
    deleteFollow
};
