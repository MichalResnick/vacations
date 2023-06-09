
import dal from "../2-utils/dal";
import VacationModel from "../4-models/vacation-model";


async function getAllVacations():Promise<VacationModel[]>{
    const sql=`SELECT V.vacationId,V.target,V.description,DATE_FORMAT(V.startDate, '%Y-%m-%d') AS startDate,
    DATE_FORMAT(V.endDate, '%Y-%m-%d') AS endDate ,V.price,V.imageName
    FROM vacations AS V`
    const vacations=await dal.execute(sql)
    return vacations
}



export default{
    getAllVacations
}