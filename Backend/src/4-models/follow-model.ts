import Joi from "joi";

class FollowModel {
    
    public followerId :number
    public userId : number;
    public vacationId: number;
 
    public constructor(follow: FollowModel) {
        this.followerId=follow.followerId
        this.userId = follow.userId;
        this.vacationId = follow.vacationId;
    }

     private static validationSchema = Joi.object({
        
        followerId: Joi.number().positive().optional().integer(),
        userId: Joi.number().required().positive().integer(),
        vacationId: Joi.number().required().positive().integer()
       
    });

    public validate(): string {
        const result = FollowModel.validationSchema.validate(this);
        return result.error?.message;
    }

}

export default FollowModel