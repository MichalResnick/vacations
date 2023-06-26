import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import appConfig from "../../../Utils/Config";
import "./VacationCard.css";

interface VacationCardProps {
	vacation:VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard">
            <div className="container">
            <NavLink to={"/vacations/"+ props.vacation.vacationId}>
            <img src={appConfig.imagesUrl+props.vacation.imageName} />
            <p className="target">{props.vacation.target}</p>
            </NavLink>
            </div>	
        </div>
    );
}

export default VacationCard;
