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

    const { register, handleSubmit, formState,setValue } = useForm<VacationModel>();
    const navigate = useNavigate();

    async function send(vacation: VacationModel) {
        const currentDate = new Date();
        const startDate = new Date(vacation.startDate);
        const endDate = new Date(vacation.endDate);
      
        if (endDate < startDate) {
          notifyService.error("End date cannot be earlier than the start date.");
          setValue("startDate", "");
          setValue("endDate", "");
          return;
        }
      
        if (currentDate > startDate || currentDate > endDate) {
          notifyService.error("Please select future dates.");
          setValue("startDate", "");
          setValue("endDate", "");
       
          return;
        }

        try {
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
            

                  
                <label>End Date: </label>
                <input type="date" {...register("endDate", VacationModel.endDateValidation)} />
                <span className="Error">{formState.errors.endDate?.message}</span>
            
    

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