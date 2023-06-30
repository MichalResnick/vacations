import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import { Button } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./AddVacation.css";
import useVerifyAdmin from "../../../Utils/UseVerifyAdmin";
import vacationsService from "../../../Services/VacationsService";


function AddVacation(): JSX.Element {

    useVerifyAdmin();

    const { register, handleSubmit, formState } = useForm<VacationModel>();
    const navigate = useNavigate();

    const [arrivalDateError, setArrivalDateError] = useState<string>("");
    const [departureDateError, setDepartureDateError] = useState<string>("");

    async function send(vacation: VacationModel) {
        try {
            const now = new Date().toISOString().slice(0, 10);
            if (vacation.startDate < now) {
                setArrivalDateError("The Date passed");
                return;
            }
            setArrivalDateError("");
            if (vacation.startDate > vacation.endDate) {
                setDepartureDateError("The Arrival-date must be before Departure-date");
                return;
            }
            setDepartureDateError("");
            await vacationsService.addVacation(vacation);
            notifyService.success("Vacation added successfully!");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddVacation">

            <form onSubmit={handleSubmit(send)}>

                <h2>Add Vacation</h2>

                <label>Target:</label>
                <input type="text" {...register("target", VacationModel.targetValidation)} />
                <span className="Error">{formState.errors.target?.message}</span>


                <label>Description:</label>
                <textarea maxLength={300} className="AddTextarea"{...register("description", VacationModel.descriptionValidation)}/>
                <span className="Error">{formState.errors.description?.message}</span>

                <label>Start Date: </label>
                <input type="date" {...register("startDate", VacationModel.startDateValidation)} />
                <span className="Error">{formState.errors.startDate?.message}</span>
                <span className="SpanMessage">{arrivalDateError}</span>

                  
                <label>End Date: </label>
                <input type="date" {...register("endDate", VacationModel.endDateValidation)} />
                <span className="Error">{formState.errors.endDate?.message}</span>
                <span className="SpanMessage">{departureDateError}</span>
    

                <label>Price:</label>
                <input type="number" step="0.01" className="AddInput" {...register("price",VacationModel.priceValidation)}/>
                <span className="SpanMessage">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image", {
                    required: { value: true, message: "Missing image" },
                })} />
                <span className="SpanImageMessage">{formState.errors.image?.message}</span>

                <Button type="submit" className="BtnAdd" startIcon={<AddCircleIcon />}>Add</Button>

            </form>

            <div><NavLink to="/vacations">-Back-</NavLink></div>

        </div>
    );
}

export default AddVacation;