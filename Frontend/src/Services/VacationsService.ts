import axios from "axios";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import VacationModel from "../Models/VacationModel";
import appConfig from "../Utils/Config";

class VacationsService {


   public async getAllVacations(header: string) :Promise<VacationModel[]>{ 

    let vacations=vacationsStore.getState().vacations

    if(vacations.length===0){

        const response=await axios.get<VacationModel[]>(appConfig.vacationsUrl)

        vacations=response.data

        vacationsStore.dispatch({type:VacationsActionType.FetchVacations,payload:vacations})
     }

     return vacations
   }





   
}

const vacationsService = new VacationsService();

export default vacationsService