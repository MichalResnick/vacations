import { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import { vacationsStore } from "../../../Redux/VacationsState";
import Pagination from "../Pagination/Pagination";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";


function VacationsList(): JSX.Element {

  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [checked, setChecked] = useState<boolean>(false);
  const[currentPage,setCurrentPage]=useState(1)
  const[postsPerPage,setPostsPerPage]=useState(8)
  const lastIndex=currentPage * postsPerPage
  const firstIndex=lastIndex-postsPerPage
  const currentVacation=vacations.slice(firstIndex,lastIndex)



  // Fetch vacations using vacationsService
  useEffect(() => {
    vacationsService.getAllVacations()
      .then((fetchedVacations) => {
        const convertedVacations = fetchedVacations.map((vacation) => ({
          ...vacation,
          startDate: new Date(vacation.startDate),
          endDate: new Date(vacation.endDate),
        }));
        setVacations(convertedVacations);
      })
      .catch((err) => notifyService.error(err));

    // Subscribe to updates using vacationsStore
    const unsubscribe = vacationsStore.subscribe(() => {
      const updatedVacations = [...vacationsStore.getState().vacations];
      setVacations(updatedVacations);
    });

    return () => unsubscribe();
  }, []);

  const filteredVacations = vacations.filter((vacation) => {
    const currentDate = new Date();
    const vacationStartDate = new Date(vacation.startDate); // Convert string to Date
    const vacationEndDate = new Date(vacation.endDate); // Convert string to Date

    if (filterType === 'upcoming') {
      return vacationStartDate > currentDate;
    } else if (filterType === 'current') {
      return vacationStartDate <= currentDate && vacationEndDate >= currentDate;
    }
    return true; // Show all vacations if no filter type is selected
  });

  // Handle filter button click events
  const handleFilterButtonClick = (type: string) => {
    setFilterType(type);
  };


  return (
    <div className="VacationList">
      {/* <marquee behavior="" direction="">נותרו רק 7 ימים עד לטיול האי הבלעדי שלנו! הזמינו עכשיו כדי להבטיח את מקומכם.</marquee> */}


      {currentVacation.length === 0 && <Spinner />}
      {filteredVacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}

      {!authService.isAdmin() && <>
        <button className="button-91" role="button" onClick={filterMyVacation}>My❤Vacation</button>
        <button onClick={() => handleFilterButtonClick('all')}>All Vacations</button>
        <button onClick={() => handleFilterButtonClick('upcoming')}>Upcoming Vacations</button>
        <button onClick={() => handleFilterButtonClick('current')}>Current Vacations</button>

      
      </>
      }

    




     <Pagination totalPosts={vacations.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage } currentPage={currentPage}/>
    </div>
  );

}

export default VacationsList;
