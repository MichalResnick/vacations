
import { OkPacket } from "mysql";
import fs from "fs"
import dal from "../2-utils/dal";
import { ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";
import images from "../2-utils/images";


// async function getAllVacations():Promise<VacationModel[]>{
//     const sql=`SELECT V.vacationId,V.target,V.description,DATE_FORMAT(V.startDate, '%Y-%m-%d') AS startDate,
//     DATE_FORMAT(V.endDate, '%Y-%m-%d') AS endDate ,V.price,V.imageName
//     FROM vacations AS V`
//     const vacations=await dal.execute(sql)
//     return vacations
// }

async function addVacation(vacation:VacationModel):Promise<VacationModel>{

    const err=vacation.validate()
    if(err) throw new ValidationErrorModel(err)

    if (vacation.image)
    vacation.imageName=await images.getImageAndGenareteName(vacation)

    const sql=`INSERT INTO vacations (target, description, startDate, endDate, price, imageName) VALUES (?, ?, ?, ?, ?, ?)`
    const values=[vacation.target,vacation.description,vacation.startDate,vacation.endDate,vacation.price,vacation.imageName]

    const info:OkPacket=await dal.execute(sql,values)
    vacation.vacationId=info.insertId
    return vacation

}

async function updateVacation(vacation:VacationModel):Promise<VacationModel>{

    const err=vacation.validate()
    if(err) throw new ValidationErrorModel(err)
   
    if (vacation.image){    
        await images.checkIfImageExistsAndDelete(vacation)
        vacation.imageName=await images.getImageAndGenareteName(vacation)  
    }
  
    
    const sql=`
    UPDATE vacations SET
    target=?,
    description=?,
    startDate=?,
    endDate=?,
    price=?,
    imageName=?
    WHERE vacationId =? `
    const values=[vacation.target,vacation.description,vacation.startDate,vacation.endDate,vacation.price,vacation.imageName,vacation.vacationId]

    const info:OkPacket=await dal.execute(sql,values)
    if(info.affectedRows===0) throw new ResourceNotFoundErrorModel(vacation.vacationId)
    return vacation

}

async function deleteVacation(vacationId: number): Promise<void> {

    //get the current image by vacationId
    const sqlSelectImage = `SELECT imageName FROM vacations WHERE vacations.vacationId = ?`;
    const vacations = await dal.execute(sqlSelectImage, [vacationId]);
    if (!vacations) throw new ResourceNotFoundErrorModel(vacationId);

    const vacation = vacations[0];
 
    //delete the image
    await images.checkIfImageExistsAndDelete(vacation)

    // delete the vacation by vacationId from DB
    const sql = `DELETE FROM vacations WHERE vacations.vacationId = ? `;

    const info: OkPacket = await dal.execute(sql, [vacationId]);

    // make sure the update was registered
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationId);

};



export default{
    // getAllVacations,
    addVacation,
    updateVacation,
    deleteVacation
}