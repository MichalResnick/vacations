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

    const navigate=useNavigate()


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
                followersService.addFollow(props.vacation.vacationId)
                return;
            }

            if(value===false){
                followersService.unFollow(props.vacation.vacationId)
                return;
            }


        } catch (error:any) {
    
           alert(error.message) 
        }
    }

    function convertDate(date: string): string {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    async function deleteVacation(vacationId:number){
        try {
            if(!window.confirm("Are you sure?")) return;
            vacationsService.deleteVacation(vacationId) 
            alert("You deleted vacation") 
            navigate("/vacations")
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
            <span>Dates: {convertDate(props.vacation.startDate)} - {convertDate(props.vacation.endDate)}</span>
            <p>{props.vacation.description}</p>
            </NavLink>
            </div>	

            {!authService.isAdmin()&& 
            <>
                <label className="follow">
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={props.vacation.isFollowing} onChange={followAndUnfollow} />
                <span className={`${props.vacation.isFollowing ? "Unfollow" : "Follow"}`}>{props.vacation.isFollowing? "Unfollow" : "Follow"}</span>
                </label>
                <div className="DivFollowCount">
                <span className="TextCountFollow">{props.vacation.followersCount}</span>
                </div>
            </>
              
              }

            {authService.isAdmin()&&
            <>
            <NavLink to={"/vacations/edit/" + props.vacation?.vacationId}>Edit Vacation</NavLink>
            <span> | </span>
            <NavLink to="#" onClick={() => deleteVacation(props.vacation.vacationId)}>Delete</NavLink> 
            </>
            
            
            }

        </div>
    );
}

export default VacationCard;
