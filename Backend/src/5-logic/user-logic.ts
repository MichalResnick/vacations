import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel } from "../4-models/error-models";

async function getVacationsForUser(userId: number) { 

const sql = `SELECT DISTINCT V.*
                ,EXISTS(SELECT * 
                    FROM followers 
                    WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing, 
                COUNT(F.userId) AS followersCount
             FROM vacations AS V LEFT JOIN followers AS F
             ON V.vacationId = F.vacationId
             GROUP BY vacationId
             ORDER BY startDate DESC`  
                
                
            
        const vacations=await dal.execute(sql,[userId])
        //validate
        if (!vacations) throw new ResourceNotFoundErrorModel(userId)

        // vacations.map((v: { isFollowed: boolean; }) => v.isFollowed = v.isFollowed ? true : false);

        return vacations;
            
        }




export default {
    getVacationsForUser
};
