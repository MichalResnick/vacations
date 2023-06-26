import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./VacationDetails.css";
import VacationModel from "../../../Models/VacationModel";
import { useEffect, useState } from "react";
import vacationsService from "../../../Services/VacationsService";
import appConfig from "../../../Utils/Config";


function VacationDetails(): JSX.Element {

    const params = useParams();
    const [vacation, setVacation] = useState<VacationModel>();
    const navigate = useNavigate();

    
    useEffect(() => {
        const vacationId = +params.vacationId; 
        vacationsService.getOneVacation(vacationId)
            .then(vacation => setVacation(vacation))
            .catch(err => alert("Error: " + err.message));
    }, []);

    function convertDate(date: string): string {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    

    return (
        <div className="VacationDetails">


            {vacation&&
             <>
                    <img src={appConfig.imagesUrl+vacation.imageName} />
                    <br />
                    <NavLink to="/vacations">Back</NavLink>
                    <h2>{vacation.target}</h2>
                    <h2>Dates: {convertDate(vacation.startDate)} - {convertDate(vacation.endDate)}</h2>
                    <p>{vacation.description}</p>
            </>
            }
    
     
         
			
        </div>
    );
}

export default VacationDetails;
