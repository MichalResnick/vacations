import { UploadedFile } from "express-fileupload";
import Joi from "joi"
import UserModel from "./users-model"

class VacationModel{
    public vacationId:number
    public target:string
    public description:string
    public startDate:string
    public endDate:string
    public price:number
    public image: UploadedFile; // The file uploaded by the frontend.
    public imageName: string; // The name of the image.

    public constructor(vacation:VacationModel){
        this.vacationId=vacation.vacationId
        this.target=vacation.target
        this.description=vacation.description
        this.startDate=vacation.startDate
        this.endDate=vacation.endDate
        this.price=vacation.price
        this.image=vacation.image
        this.imageName=vacation.imageName
    }

    public  static validationSchema=Joi.object({
        vacationId:Joi.number().positive().optional().integer(),
        target:Joi.string().required(),
        description:Joi.string().required(),
        startDate:Joi.date(),
        endDate: Joi.date(),
        price:Joi.number().min(0).max(10000),
        image: Joi.object().optional(),
        imageName: Joi.string().optional()
    })

    public validate():string{
        const result=VacationModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default VacationModel