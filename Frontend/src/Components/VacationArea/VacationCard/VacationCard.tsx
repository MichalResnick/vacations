import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import appConfig from "../../../Utils/Config";
import "./VacationCard.css";
import { SyntheticEvent, useEffect, useState } from "react";
import authService from "../../../Services/AuthService";
import vacationsService from "../../../Services/VacationsService";
import followersService from "../../../Services/FollowersService";
import { vacationsStore } from "../../../Redux/VacationsState";
import { Checkbox, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";


interface VacationCardProps {
	vacation:VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {

    const[vacation ,setVacation]=useState<VacationModel>()
    const navigate=useNavigate()


    useEffect(()=>{
        try{
        const specificVacation=vacationsStore.getState().vacations.find(v=>v.vacationId===props.vacation.vacationId)
        setVacation(specificVacation)

        const unsubscribe = vacationsStore.subscribe(() => {
            const newVacation = { ...vacationsStore.getState().vacations.find(v => v.vacationId === props.vacation.vacationId) };
            setVacation(newVacation);
        });
        return () => {
            unsubscribe();
        }
        
        }
        catch(err:any){
         alert(err.message)
        }

    },[])


    async function followAndUnfollow(args:SyntheticEvent){
        try {
            if(!authService.isLoggedIn){
                alert("You are not logged in!")
                navigate("/login") 
                return;   
            }
            const target = args.target as HTMLInputElement;
            let value = target.checked;

            if(value===true){
                followersService.addFollow(vacation.vacationId)
                return;
            }

            if(value===false){
                followersService.unFollow(vacation.vacationId)
                return;
            }


        } catch (error:any) {
    
           alert(error.message) 
        }
    }

    return (
        <div className="VacationCard">
            <div className="container">
            <NavLink to={"/vacations/"+ props.vacation.vacationId}>
            <img src={appConfig.imagesUrl+props.vacation.imageName} />
            <p className="target">{props.vacation.target}</p>
            </NavLink>
            </div>	

            {!authService.isAdmin()&& <>
                <label className="follow">
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={props.vacation.isFollowing} onChange={followAndUnfollow} />
                <span className={`${props.vacation.isFollowing ? "Unfollow" : "Follow"}`}>{props.vacation.isFollowing? "Unfollow" : "Follow"}</span>
                </label>
                <div className="DivFollowCount">
                                <span className="TextCountFollow">{vacation.followersCount}</span>
                </div>
            </>
              
              }

        </div>
    );
}

export default VacationCard;
