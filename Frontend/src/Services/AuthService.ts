import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthActionType, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/Config";
import jwtDecode from "jwt-decode";

class AuthService {

    // Registering a new user: 
    public async register(user: UserModel): Promise<void> {

        // Send to backend the new user: 
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Backend returns token: 
        const token = response.data;

        // Send token to Redux: 
        authStore.dispatch({ type: AuthActionType.Register, payload: token });
    }

    // Login existing user: 
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send to backend the credentials: 
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Backend returns token: 
        const token = response.data;

        // Send token to Redux:
        authStore.dispatch({ type: AuthActionType.Login, payload: token });
    }

    // Logout existing user:
    public logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout });
    }

    public async isEmailAddressTaken(email:string):Promise<boolean>{
        const response=await axios.get<boolean>(appConfig.authUrl+email)
       return response.data //the email is already exists.

    }

    public isAdmin(user: UserModel = null): boolean {
        if (!user) {
            user = authStore.getState().user;
            if (!user) return false;
        }
        return user.role === "Admin";
    }

    // Check if a valid token exists;
    public isLoggedIn(): boolean {
        if (authStore.getState().token === null) return false;
        const container: { exp: number } = jwtDecode(authStore.getState().token);
        const now = new Date();
        //token.exp is in seconds, while Date.getTime is in milliseconds
        return container.exp * 1000 > now.getTime();
    }

}


const authService = new AuthService();

export default authService;
