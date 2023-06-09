import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import VacationList from "../../VacationArea/VacationsList/VacationsList";
import VacationDetails from "../../VacationArea/VacationDetails/VacationDetails";
import EditVacation from "../../AdminArea/EditVacation/EditVacation";
import UserModel from "../../../Models/UserModel";
import { useEffect, useState } from "react";
import { authStore } from "../../../Redux/AuthState";
import Logout from "../../AuthArea/Logout/Logout";
import AddVacation from "../../AdminArea/AddVacation/AddVacation";
import VacationsChart from "../../AdminArea/VacationCharts/VacationCharts";
import OpeningScreen from "../OpeningScreen/OpeningScreen";




function Routing(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return () => unsubscribe();
    }, [])

    return (
        <div className="Routing">
            <Routes>
                <Route path="/openingScreen" element={<OpeningScreen />} /> 
                <Route path="/register" element={ user ? <Navigate to="/vacations" /> :<Register />} />
                <Route path="/login" element={user ? <Navigate to="/vacations" /> :<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/vacations" element={<VacationList />} />
                <Route path="/vacations/:vacationId" element={<VacationDetails />} />
                <Route path="/vacations/edit/:vacationId" element={<EditVacation />} />
                <Route path="/vacations/new" element={<AddVacation />} />
                <Route path="/vacations/charts" element={<VacationsChart />} />
                <Route path="/" element={<Navigate to="/openingScreen" />} />
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
