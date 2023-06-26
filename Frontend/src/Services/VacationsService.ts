import axios from "axios";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/Config";

class VacationsService {


   public async getAllVacations() :Promise<VacationModel[]>{ 

    let vacations=vacationsStore.getState().vacations
    console.log("1" +vacations)


     if(vacations.length===0){
        const response=await axios.get<VacationModel[]>(appConfig.vacationsUrl)

        vacations=response.data
        console.log("2"+vacations)

        vacationsStore.dispatch({type:VacationsActionType.FetchVacations,payload:vacations})
     }
     

     return vacations
   }


   public async getOneVacation(vacationId: number): Promise<VacationModel> {

     // Take vacations from global store:
        let vacations = vacationsStore.getState().vacations;

        // Find required vacation:
         let vacation = vacations.find(v => v.vacationId === vacationId);
    
        // If we don't have that vacation in global state:
        if (!vacation) {
    
            // AJAX Request: 
            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + vacationId);
    
                // Extract vacation: 
                vacation = response.data;
            }

        return vacation;
    }

    public async getMyVacations(): Promise<VacationModel[]> {

        // Take vacations from global store:
           let vacations = vacationsStore.getState().vacations;
   
           vacations=vacations.filter(v=>v.isFollowing===true)

           return vacations
       }

    //add vacation
    public async addVacation(vacation:VacationModel):Promise<void>{

        const myFormData = new FormData(); // Can contain strings and / or files.
        myFormData.append("target", vacation.target);
        myFormData.append("description", vacation.description);
        myFormData.append("startDate", vacation.startDate);
        myFormData.append("endDate", vacation.endDate);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image[0]); // image = FileList, image[0] = File

        const response=await axios.post<VacationModel>(appConfig.vacationsUrl,myFormData)

        const addedVacation=response.data

        vacationsStore.dispatch({type:VacationsActionType.AddVacation,payload:addedVacation})

    }

    //update vacation

    public async updateVacation(vacation:VacationModel):Promise<void>{

        const myFormData = new FormData(); // Can contain strings and / or files.
        myFormData.append("target", vacation.target);
        myFormData.append("description", vacation.description);
        myFormData.append("startDate", vacation.startDate);
        myFormData.append("endDate", vacation.endDate);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("image", vacation.image[0]); // image = FileList, image[0] = File

        const response=await axios.put<VacationModel>(appConfig.vacationsUrl+vacation.vacationId ,myFormData)

        const updatedVacation=response.data

        vacationsStore.dispatch({type:VacationsActionType.UpdateVacation,payload:updatedVacation})

    }

    //Delete vacation
    public async deleteVacation(vacationId: number): Promise<void> {

        // Delete in backend:
        await axios.delete<void>(appConfig.vacationsUrl + vacationId);

        // Delete in global state: 
        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: vacationId });
    }


}

const vacationsService = new VacationsService();

export default vacationsService