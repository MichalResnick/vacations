import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";
import Register from "../../AuthArea/Register/Register";
import Login from "../../AuthArea/Login/Login";
import VacationList from "../../VacationArea/VacationsList/VacationsList";
import VacationDetails from "../../VacationArea/VacationDetails/VacationDetails";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/vacations" element={<VacationList/>} />
                <Route path="/vacations/:vacationId" element={<VacationDetails/>} />
                <Route path="/" element={<Navigate to="/register" />} />
                <Route path="*" element={<PageNotFound />} />

            </Routes>
        </div>
    );
}

export default Routing;
