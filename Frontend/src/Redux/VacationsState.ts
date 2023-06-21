import { Interface } from "readline";
import VacationModel from "../Models/VacationModel";
import { type } from "os";
import { createStore } from "redux";

// 1. Global State - the global data:
export class VacationsState {
    public vacations:VacationModel [] = [];
}

// 2. Action Type - a list of operations we can perform on the data:
export enum VacationsActionType{
    FetchVacations,
    AddVacation,
    UpdateVacation,
    DeleteVacation,
    Follow,
    UnFollow,
    ResetVacations
}

// 3. Action - A single object which dispatch sends to Redux for some change:
export interface VacationsActions{
    type: VacationsActionType;
    payload: any;
}

// 4. Reducer - a function which will be invoked when calling dispatch to perform the operation
export function vacationReducer(currentState = new VacationsState(), action: VacationsActions): VacationsState {

    const newState={...currentState}

    switch(action.type){

        case VacationsActionType.FetchVacations: 
            newState.vacations = action.payload;
            break;

        case VacationsActionType.AddVacation:
            newState.vacations.push(action.payload)
            break;

        case VacationsActionType.UpdateVacation:
            const indexToUpdate=newState.vacations.findIndex(v=>v.vacationId=action.payload.vacationId)
            if (indexToUpdate >= 0) {
                newState.vacations[indexToUpdate] = action.payload; 
            }
            break;

        case VacationsActionType.DeleteVacation: // Here payload must be id to delete
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            if (indexToDelete >= 0) {
                newState.vacations.splice(indexToDelete, 1);
            }
            break;

        case VacationsActionType.Follow: // Here payload must be the follower to add
            const fIndexToUpdate = newState.vacations.findIndex(f => f.vacationId === action.payload.vacationId);
            if (fIndexToUpdate >= 0) {
                newState.vacations[fIndexToUpdate].followersCount++;
                newState.vacations[fIndexToUpdate].isFollowed = true;
            }
            break;
            
        case VacationsActionType.UnFollow: // Here payload must be id to delete
            const fIndexToDelete = newState.vacations.findIndex(f => f.vacationId === action.payload); 
            if (fIndexToDelete >= 0) {
                newState.vacations[fIndexToDelete].followersCount--;
                newState.vacations[fIndexToDelete].isFollowed = false;
            }
            break;
        
        case VacationsActionType.ResetVacations: 
            newState.vacations=[];
            break;
    }
    
    return newState; // return the new state
}

//5. Store  redux object for managing the global state:
export const vacationsStore = createStore(vacationReducer);