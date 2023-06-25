import { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";

function VacationsList(): JSX.Element {

  const [vacations, setVacations]=useState<VacationModel[]>()

  useEffect(()=>{
    vacationsService.getAllVacations()
    .then(vacations=>setVacations(vacations))
    .catch(err=>alert(err.message))
  },[])

    return (
        <div className="VacationList">
            {/* <marquee behavior="" direction="">נותרו רק 7 ימים עד לטיול האי הבלעדי שלנו! הזמינו עכשיו כדי להבטיח את מקומכם.</marquee> */}
			
        </div>
    );
}

export default VacationsList;
