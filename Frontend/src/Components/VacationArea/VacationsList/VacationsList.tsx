import { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";

function VacationsList(): JSX.Element {

  const [vacations, setVacations]=useState<VacationModel[]>([])

  useEffect(()=>{
    vacationsService.getAllVacations()
    .then(vacations=>setVacations(vacations))
    .catch(err=>alert(err.message))
  },[])

    return (
        <div className="VacationList">
            {/* <marquee behavior="" direction="">נותרו רק 7 ימים עד לטיול האי הבלעדי שלנו! הזמינו עכשיו כדי להבטיח את מקומכם.</marquee> */}
			

            {vacations.length === 0 && <Spinner />}
            {vacations.map(v=><VacationCard key={v.vacationId} vacation={v}/>)}
        </div>
    );
}

export default VacationsList;
