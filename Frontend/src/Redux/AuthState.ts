
import { createStore } from "redux";
import UserModel from "../Models/UserModel";
import jwtDecode from "jwt-decode";

// 1. Auth State
export class AuthState {
    
    public token: string = null;
    public user: UserModel = null;

    public constructor() {

        // Take token from session storage, restore if exists:
        this.token = sessionStorage.getItem("token");
        if(this.token) {
            const container: { user: UserModel } = jwtDecode(this.token); // { user: { id: 1, firstName: "Moishe", ... } }
            this.user = container.user;
        }
    }

}

// 2. Auth Action Type
export enum AuthActionType {
    Register,
    Login,
    Logout
}

// 3. Auth Action
export interface AuthAction {
    type: AuthActionType;
    payload?: string; // string because of the token, optional because logout needs no payload.
}

// 4. Auth Reducer
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    // Duplicate current state: 
    const newState = { ...currentState };

    // Perform the needed operation: 
    switch (action.type) {

        case AuthActionType.Register: // Here the payload is the token (string).
        case AuthActionType.Login: // Here the payload is the token (string).
            newState.token = action.payload;
            const container: { user: UserModel } = jwtDecode(newState.token); // { user: { id: 1, firstName: "Moishe", ... } }
            newState.user = container.user;
            sessionStorage.setItem("token", newState.token);
            break;

        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            sessionStorage.removeItem("token");
            break;
    }

    // Return the new state: 
    return newState;
}


// 5. Auth Store
export const authStore = createStore(authReducer);
