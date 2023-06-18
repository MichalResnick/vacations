
import { OkPacket } from "mysql";
import fs from "fs"
import dal from "../2-utils/dal";
import { ValidationErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";
import { v4 as uuid } from "uuid";


async function getAllVacations():Promise<VacationModel[]>{
    const sql=`SELECT V.vacationId,V.target,V.description,DATE_FORMAT(V.startDate, '%Y-%m-%d') AS startDate,
    DATE_FORMAT(V.endDate, '%Y-%m-%d') AS endDate ,V.price,V.imageName
    FROM vacations AS V`
    const vacations=await dal.execute(sql)
    return vacations
}

async function addVacation(vacation:VacationModel):Promise<VacationModel>{

    const err=vacation.validate()
    if(err) throw new ValidationErrorModel(err)

    if (vacation.image) {
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;
    }

    const imageBuffer = fs.readFileSync('./src/1-assets/images/' + vacation.imageName);
    const sql=`INSERT INTO vacations (target, description, startDate, endDate, price, image) VALUES (?, ?, ?, ?, ?, ?)`
    const values=[vacation.target,vacation.description,vacation.startDate,vacation.endDate,vacation.price,imageBuffer]

    const info:OkPacket=await dal.execute(sql,values)
    vacation.vacationId=info.insertId
    return vacation

}



export default{
    getAllVacations,
    addVacation
}