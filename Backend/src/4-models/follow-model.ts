import Joi, { number, object } from "joi";

class FolloweModel {

    public userId: number;
    public vacationId: number;

    public constructor (userId: number, vacationId: number) {

        this.userId = userId;
        this.vacationId = vacationId;
    }

    private static validationSchema = Joi.object({
        userId: Joi.number().required().positive().integer(),
        vacationId: Joi.number().optional().positive().integer()
    })

    public validate ():string {
        const result = FolloweModel.validationSchema.validate(this);
        return result.error?.message;
    }
}

export default FolloweModel;