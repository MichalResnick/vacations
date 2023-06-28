import { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import { vacationsStore } from "../../../Redux/VacationsState";

function VacationsList(): JSX.Element {

  const [vacations, setVacations] = useState<VacationModel[]>([])
  const[currentPage,setCurrentPage]=useState(1)
  const[postsPerPage,setPostsPerPage]=useState(8)

  useEffect(() => {
    vacationsService.getAllVacations()
      .then(vacations => setVacations(vacations))
      .catch(err => alert(err.message))


    const unsubscribe = vacationsStore.subscribe(() => {
      const dup = [...vacationsStore.getState().vacations];
      setVacations(dup);
    });

    return () => unsubscribe();


  }, [])

  const lastIndex=currentPage * postsPerPage
  const firstIndex=lastIndex-postsPerPage
  const currentVacation=vacations.slice(firstIndex,lastIndex)

  return (
    <div className="VacationList">
      {/* <marquee behavior="" direction="">נותרו רק 7 ימים עד לטיול האי הבלעדי שלנו! הזמינו עכשיו כדי להבטיח את מקומכם.</marquee> */}


      {currentVacation.length === 0 && <Spinner />}
      {currentVacation.map(v => <VacationCard key={v.vacationId} vacation={v} />)}
    </div>
  );
}

export default VacationsList;
