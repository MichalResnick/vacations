import VacationModel from "../../../Models/VacationModel";
import appConfig from "../../../Utils/Config";
import "./VacationCard.css";

interface VacationCardProps {
	vacation:VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard">
            <img src={`${appConfig.vacationsUrl}+images+${props.vacation.imageName}|| ImageNotFound!`} />	
        </div>
    );
}

export default VacationCard;
