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
import { Button } from "@mui/material";


function VacationsList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [showMyVacation, setShowMyVacation] = useState(false);

  useEffect(() => {
    vacationsService
      .getAllVacations()
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

  const filteredVacations = vacations.filter((vacation) => {
    const currentDate = new Date();
    const vacationStartDate = new Date(vacation.startDate);
    const vacationEndDate = new Date(vacation.endDate);

    if (filterType === 'all') {
      return true; // Show all vacations
    }

    if (filterType === 'following') {
      return vacation.isFollowing; // Show vacations user is following
    }

    if (filterType === 'upcoming') {
      return vacationStartDate > currentDate 
    }

    if (filterType === 'current') {
      return vacationStartDate <= currentDate && vacationEndDate >= currentDate 
    }

    return false; // Filter type not recognized, return false to hide vacation
  });

  const handleFilterButtonClick = (type: string) => {
    if (type === 'all') {
      setFilterType('all');
      setShowMyVacation(false);
    } else {
      setFilterType(type);
    }
    setCurrentPage(1);
  };


  const indexOfLastVacation = currentPage * postsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - postsPerPage;
  const currentVacations = filteredVacations.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );

  const handlePaginationChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="VacationList">
      {currentVacations.length === 0 && <Spinner />}
      {!authService.isAdmin() && (
        <>
          <Button  className="button" variant="contained" color="primary"  onClick={() => handleFilterButtonClick('all')}>
            {filterType === 'all' ? 'All Vacations' : 'Show All Vacations'}
          </Button>
          <Button  className="button" variant="contained" color="primary" onClick={() => handleFilterButtonClick('following')}>
            My Vacations
            </Button>
            <Button  className="button" variant="contained" color="primary" onClick={() => handleFilterButtonClick('upcoming')}>
            Upcoming Vacations
            </Button>
          <Button  className="button" variant="contained" color="primary" onClick={() => handleFilterButtonClick('current')}>
            Current Vacations
          </Button>
          <br /><br />

        </>
      )}
          {authService.isAdmin() && (
        <>
          <br />
          <br />
          <NavLink to="/vacations/new">
          <Button  className="button" variant="contained" color="primary">
          Add Vacation
            </Button>
          </NavLink>
          <NavLink to="/vacations/charts">
          <Button  className="button" variant="contained" color="primary">
           Charts
            </Button>
          </NavLink>
      <br />
        </>
      )}
      

      {currentVacations.map((v) => (
        <VacationCard key={v.vacationId} vacation={v} />
      ))}


      <Pagination
        totalPosts={filteredVacations.length}
        postsPerPage={postsPerPage}
        setCurrentPage={handlePaginationChange}
        currentPage={currentPage}
      />
      <br />
      <br />
    </div>
  );
}

export default VacationsList;
