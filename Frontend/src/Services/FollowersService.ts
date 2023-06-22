import axios from "axios";
import FollowModel from "../Models/FollowModel";
import appConfig from "../Utils/Config";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";

class FollowersService{


   public async addFollow(vacationId:number):Promise<void>{

    await axios.post<FollowModel>(appConfig.followersUrl+vacationId);

    vacationsStore.dispatch({type:VacationsActionType.Follow,payload:vacationId})

   }

   
   public async unFollow(vacationId:number):Promise<void>{

    await axios.delete<FollowModel>(appConfig.followersUrl+vacationId);

    vacationsStore.dispatch({type:VacationsActionType.UnFollow,payload:vacationId})
   }
}

const followersService = new FollowersService();

export default followersService