import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import FollowModel from "../4-models/follow-model";
import exp from "constants";


async function addFollow(follow:FollowModel):Promise<FollowModel>{
    const err=follow.validate()
    if(err) throw new ValidationErrorModel(err)
    
    const sql=`INSERT INTO followers VALUES(DEFAULT,?,?) `
    const values=[follow.userId,follow.vacationId]

    const info:OkPacket=await dal.execute(sql,values)
    follow.followerId=info.insertId
    return follow

}

async function deleteFollow(followId:number){
   
    const sql = `DELETE FROM followers WHERE followers.followerId  = ? `;

    const info:OkPacket=await dal.execute(sql,[followId])
   
    if(info.affectedRows===0) throw new ResourceNotFoundErrorModel(followId)
   
}


export default {
    addFollow,
    deleteFollow
};
