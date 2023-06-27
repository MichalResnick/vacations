import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";

function EditProduct(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const id = +params.prodId; // Same name as router parameter.
        vacationsService.getOneVacation(id)
            .then(vacation => {
                setValue("vacationId", vacation.vacationId);
                setValue("target", vacation.target);
                setValue("description", vacation.description);
                setValue("startDate", vacation.startDate);
                setValue("endDate", vacation.endDate);
                setValue("price", vacation.price);
                setValue("price", vacation.price);
            })
            .catch(err => alert(err.message));
    }, []);

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.updateVacation(vacation);
            alert("Vacation has been successfully updated");
            navigate("/vacations");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="EditVacation Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Edit Vacation:</h2>

                <input type="hidden" {...register("vacationId")} />

                <label>Target: </label>
                <input type="text" {...register("target", VacationModel.targetValidation)} />
                <span className="Error">{formState.errors.target?.message}</span>

                <label>Description: </label>
                <input type="text" {...register("description", VacationModel.descriptionValidation)} />
                <span className="Error">{formState.errors.description?.message}</span>

                {/* <label>Stock: </label>
                <input type="number" {...register("stock", ProductModel.stockValidation)} />
                <span className="Error">{formState.errors.stock?.message}</span> */}

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Update</button>

            </form>

        </div>
    );
}

export default EditProduct;
