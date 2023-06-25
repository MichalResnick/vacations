import Joi from "joi"
import RoleModel from "./role-model";

class UserModel {

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public role: RoleModel;

    public constructor(user: UserModel) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    public  static validationSchema=Joi.object({
        userId:Joi.number().positive().optional().integer(),
        firstName:Joi.string().min(2).max(30).required(),
        lastName:Joi.string().min(2).max(30).required(),
        email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(4),
        role:Joi.forbidden()
    })

    public validate():string{
        const result=UserModel.validationSchema.validate(this)
        return result.error?.message
    }
}

export default UserModel;