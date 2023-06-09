import Joi from "joi";

class FollowVacationModel {
 
    public userId : number;
    public vacationId: number;
 
    public constructor(followVacation: FollowVacationModel) {
        this.userId = followVacation.userId;
        this.vacationId = followVacation.vacationId;
    }

     private static validationSchema = Joi.object({
        
        userId: Joi.number().required().positive().integer(),
        vacationId: Joi.number().required().positive().integer()
       
    });

    public validate(): string {
        const result = FollowVacationModel.validationSchema.validate(this);
        return result.error?.message;
    }

}