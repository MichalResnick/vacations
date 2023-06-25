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
            <img src={appConfig.picturesUrl+props.vacation.imageName} />
            <p>{props.vacation.target}</p>
            </div>	
        </div>
    );
}

export default VacationCard;
