import { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import { vacationsStore } from "../../../Redux/VacationsState";
import Pagination from "../Pagination/Pagination";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { NavLink } from "react-router-dom";

function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  const [showMyVacation, setShowMyVacation] = useState(false);

  useEffect(() => {
    vacationsService.getAllVacations()
    .then((fetchedVacations) => {
      setVacations(fetchedVacations);
    })
      .catch((err) => notifyService.error(err));

    const unsubscribe = vacationsStore.subscribe(() => {
      const updatedVacations = [...vacationsStore.getState().vacations];
      setVacations(updatedVacations);
    });

    return () => unsubscribe();
  }, []);

  const filteredVacations  = vacations.filter((vacation) => {
    const currentDate = new Date();
    const vacationStartDate = new Date(vacation.startDate); // Convert string to Date
    const vacationEndDate = new Date(vacation.endDate); // Convert string to Date

    if (showMyVacation && authService.isLoggedIn()) {
      return vacation.isFollowing;
    } else if (filterType === 'upcoming') {
      return vacationStartDate > currentDate;
    } else if (filterType === 'current') {
      return vacationStartDate <= currentDate && vacationEndDate >= currentDate;
    }
    return true; // Show all vacations if no filter type is selected
  });

  const handleFilterButtonClick = (type: string) => {
    setFilterType(type);
  };

  const filterMyVacation = () => {
    setShowMyVacation((prevState) => !prevState);
    setCurrentPage(1); // Reset the current page when the filter is changed
  };

  const indexOfLastVacation = currentPage * postsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - postsPerPage;
  const currentVacations = filteredVacations.slice(indexOfFirstVacation, indexOfLastVacation);
  const handlePaginationChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="VacationList">
      {currentVacations.length === 0 && <Spinner />}
    
      {currentVacations.map((v) => (
        <VacationCard key={v.vacationId} vacation={v} />
      ))}

      {!authService.isAdmin() && (
        <>
          <button onClick={() => handleFilterButtonClick('all')}>All Vacations</button>
          <button onClick={() => handleFilterButtonClick('upcoming')}>Upcoming Vacations</button>
          <button onClick={() => handleFilterButtonClick('current')}>Current Vacations</button>
          <button onClick={filterMyVacation}>My Vacation</button>
        </>
      )}

      {authService.isAdmin()&&(

        <>
        <br /><br />
          <NavLink to="/vacations/new">➕</NavLink>
          <br />
          <NavLink to="/vacations/charts">charts</NavLink>
        </>

      )}

      <br /><br /><br />

      <Pagination
        totalPosts={filteredVacations.length}
        postsPerPage={postsPerPage}
        setCurrentPage={handlePaginationChange}
        currentPage={currentPage}
      />      
  </div>
  );
}

export default VacationsList;
