import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import appConfig from "../../../Utils/Config";
import "./VacationCard.css";
import { SyntheticEvent, useEffect, useState } from "react";
import authService from "../../../Services/AuthService";
import vacationsService from "../../../Services/VacationsService";
import followersService from "../../../Services/FollowersService";
import { vacationsStore } from "../../../Redux/VacationsState";
import { Card, CardContent, CardMedia, Checkbox, IconButton, Tooltip, Typography } from "@mui/material";
import { Delete, Edit, Favorite, FavoriteBorder } from "@mui/icons-material";
import notifyService from "../../../Services/NotifyService";


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
         notifyService.error(error.message);
        }

    }

return (
    <Card className="VacationCard">
      <NavLink to={"/vacations/" + props.vacation.vacationId} className="card-link">
        <div className="card-header">
          <CardMedia
            component="img"
            height="200"
            image={appConfig.imagesUrl + props.vacation.imageName}
            alt={props.vacation.target}
          />
          <div className="header-overlay">
            <Typography variant="h6" component="div" className="target">
              {props.vacation.target}
            </Typography>
            <Typography variant="body2" color="textSecondary" className="date-range">
              Dates: {convertDate(props.vacation.startDate)} - {convertDate(props.vacation.endDate)}
            </Typography>
          </div>
        </div>
        <CardContent>
          <Typography variant="body2" color="textSecondary" className="description">
            {props.vacation.description.substr(0, 100)}...
          </Typography>
          <Typography variant="body2" color="textSecondary" className="price">
            Price: {props.vacation.price} USD
          </Typography>
        </CardContent>
      </NavLink>

      <CardContent className="card-actions">
        {!authService.isAdmin() && (
          <>
             <label className="follow">
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} checked={props.vacation.isFollowing} onChange={followAndUnfollow} />
                <span className={`${props.vacation.isFollowing ? "Unfollow" : "Follow"}`}>{props.vacation.isFollowing? "Unfollow" : "Follow"}</span>
                </label>
            <Typography variant="body2" className="follow-count">
              {props.vacation.followersCount}
            </Typography>
          </>
        )}

        {authService.isAdmin() && (
          <div className="admin-icons">
            <IconButton className="icon" size="small" component={NavLink} to={"/vacations/edit/" + props.vacation.vacationId}>
              <Edit />
            </IconButton>
            <IconButton className="icon" size="small" onClick={() => deleteVacation(props.vacation.vacationId)}>
              <Delete />
            </IconButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default VacationCard;