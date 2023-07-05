import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./VacationDetails.css";
import VacationModel from "../../../Models/VacationModel";
import { useEffect, useState } from "react";
import vacationsService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/Config";
import notifyService from "../../../Services/NotifyService";


function VacationDetails(): JSX.Element {

    const params = useParams();
    const [vacation, setVacation] = useState<VacationModel>();

    
    useEffect(() => {
        const vacationId = +params.vacationId; 
        vacationsService.getOneVacation(vacationId)
            .then(vacation => setVacation(vacation))
            .catch((err) => notifyService.error(err));
    }, []);

    function convertDate(date: string): string {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    
    return (
    <div className="VacationDetails">
    {vacation && (
      <>
        <div className="image-container">
          <img src={appConfig.imagesUrl + vacation.imageName} alt="Vacation" />
        </div>
        <div className="content-container">
          <NavLink to="/vacations" className="back-link">
            Back
          </NavLink>
          <h2 className="target">{vacation.target}</h2>
          <h2 className="dates">
            Dates: {convertDate(vacation.startDate)} - {convertDate(vacation.endDate)}
          </h2>
          <p className="description">{vacation.description}</p>
        </div>
      </>
    )}
  </div>
);
}

export default VacationDetails;
