import { useEffect, useState } from "react";
import "./VacationsList.css";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import { vacationsStore } from "../../../Redux/VacationsState";
import Pagination from "../Pagination/Pagination";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import authService from "../../../Services/AuthService";


function VacationsList(): JSX.Element {

  const [vacations, setVacations] = useState<VacationModel[]>([])
  const [checked, setChecked] = useState<boolean>(false);
  const[currentPage,setCurrentPage]=useState(1)
  const[postsPerPage,setPostsPerPage]=useState(8)
  const lastIndex=currentPage * postsPerPage
  const firstIndex=lastIndex-postsPerPage
  const currentVacation=vacations.slice(firstIndex,lastIndex)


  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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

  async function filterMyVacation(args:any){
    try {
      if(args.target.checked){
        vacationsService.getMyVacations()
        .then(myvacations=>{
          setVacations(myvacations),
          setChecked(true)})

        .catch()
      }
      
    } catch (error) {
      alert      
    }
  }



  return (
    <div className="VacationList">
      {/* <marquee behavior="" direction="">נותרו רק 7 ימים עד לטיול האי הבלעדי שלנו! הזמינו עכשיו כדי להבטיח את מקומכם.</marquee> */}


      {currentVacation.length === 0 && <Spinner />}
      {currentVacation.map(v => <VacationCard key={v.vacationId} vacation={v} />)}

      {!authService.isAdmin() && <>
                <Checkbox {...label} icon={<FavoriteBorder />} color="secondary" checkedIcon={<Favorite />} checked={checked} onChange={filterMyVacation} className="CheckBoxFilter" />
                <p className="MyVacations">My Vacations</p>
            </>}


     <Pagination totalPosts={vacations.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage } currentPage={currentPage}/>
    </div>
  );

}

export default VacationsList;
