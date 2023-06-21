import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";

//Get all vacations with followers count
async function getAllVacations(header: string) :Promise<VacationModel[]>{ 

    const userId=cyber.getUserIdFromToken(header)

    const sql = `SELECT DISTINCT
                V.vacationId,V.target,V.description,DATE_FORMAT(V.startDate, '%Y-%m-%d') AS startDate,
                DATE_FORMAT(V.endDate, '%Y-%m-%d') AS endDate ,V.price,V.imageName
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
    
    vacations.map((v: { isFollowing: boolean; }) => v.isFollowing = v.isFollowing ? true : false);
    
    return vacations;
                
     }

//Get one vacation by vacationId
async function getOneVacation(vacationId: number): Promise<VacationModel> {

    //get one vacation by id
    const sql = `SELECT * FROM vacations
                    WHERE vacationId = ?`;

    const vacations = await dal.execute(sql, [vacationId]);

    const vacation = vacations[0];

    // validate if the vacation was returned:
    if (!vacation) throw new ResourceNotFoundErrorModel(vacationId);

    return vacation;
};

export default{
    getAllVacations,
    getOneVacation
}