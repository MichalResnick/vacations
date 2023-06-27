import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { UnauthorizedErrorModel, ValidationErrorModel } from "../4-models/error-models";
import UserModel from "../4-models/users-model";
import cyber from "../2-utils/cyber";
import RoleModel from "../4-models/role-model";
import CredentialsModel from "../4-models/credentials-model";

async function register(user:UserModel):Promise<string>{
   const error=user.validate()
   if (error) throw new ValidationErrorModel(error)
   if (await isEmailAddressTaken(user.email)) throw new ValidationErrorModel(`There is already a user at this email address ${user.email} `);

   user.password = cyber.hash(user.password);
   user.role = RoleModel.User
   console.log(user.password)
   const sql=`INSERT INTO users VALUES(DEFAULT,?,?,?,?,?)`;
    await dal.execute(sql, [user.firstName, user.lastName, user.email, user.password,user.role]);

    const token = cyber.getNewToken(user);
    return token;
   
}

async function isEmailAddressTaken(email: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) AS count FROM users WHERE email = ?`;
    const result = await dal.execute(sql, [email]);
    const count = result[0].count;
    return count > 0;
}


async function login(credentials: CredentialsModel): Promise<string> {

    const error = credentials.validate();
    if (error) throw new ValidationErrorModel(error);

    // Hash password:
    // credentials.password = cyber.hash(credentials.password);

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

    const users = await dal.execute(sql, [credentials.email, credentials.password]);
    if (users.length === 0) throw new UnauthorizedErrorModel("Incorrect username or password");

    const user = users[0];
    const token = cyber.getNewToken(user);
    return token;
}

export default{
    register,
    login,
    isEmailAddressTaken
}