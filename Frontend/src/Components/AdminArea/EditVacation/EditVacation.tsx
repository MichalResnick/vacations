import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import useVerifyAdmin from "../../../Utils/UseVerifyAdmin";
import appConfig from "../../../Utils/Config";
import notifyService from "../../../Services/NotifyService";

function EditVacation(): JSX.Element {
  useVerifyAdmin();

  const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
  const [vacation, setVacation] = useState<VacationModel>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const vacationId = +params.vacationId;
    vacationsService
      .getOneVacation(vacationId)
      .then((vacation) => {
        setValue("vacationId", vacation.vacationId);
        setValue("target", vacation.target);
        setValue("description", vacation.description);
        setValue("startDate", vacation.startDate);
        setValue("endDate", vacation.endDate);
        setValue("price", vacation.price);
        setValue("imageName", vacation.imageName);
        setVacation(vacation);
      })
      .catch((err) => alert(err.message));
  }, []);

  async function send(vacation: VacationModel) {
    const currentDate = new Date();
    const startDate = new Date(vacation.startDate);
    const endDate = new Date(vacation.endDate);

    if (endDate < startDate) {
      notifyService.error("End date cannot be earlier than the start date.");
      return;
    }

    if (currentDate > endDate) {
      const confirmed = window.confirm(
        "The selected end date is in the past. Are you sure you want to proceed?"
      );
      if (!confirmed) {
        return;
      }
    }

    try {
      await vacationsService.updateVacation(vacation);
      notifyService.success("Vacation has been successfully updated");
      navigate("/vacations");
    } catch (err: any) {
      alert(err.message);
    }
  }

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <div className="EditVacation">
      <form onSubmit={handleSubmit(send)}>
        <h2>Edit Vacation:</h2>

        <input type="hidden" {...register("vacationId")} />

        <div className="form-group">
          <label>Target:</label>
          <input type="text" {...register("target", VacationModel.targetValidation)} />
          <span className="Error">{formState.errors.target?.message}</span>
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input type="text" {...register("description", VacationModel.descriptionValidation)} />
          <span className="Error">{formState.errors.description?.message}</span>
        </div>

        <div className="form-group">
          <label>Start Date:</label>
          <input type="date" {...register("startDate", VacationModel.startDateValidation)} />
          <span className="Error">{formState.errors.startDate?.message}</span>
        </div>

        <div className="form-group">
          <label>End Date:</label>
          <input type="date" {...register("endDate", VacationModel.endDateValidation)} />
          <span className="Error">{formState.errors.endDate?.message}</span>
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input type="number" {...register("price", VacationModel.priceValidation)} />
          <span className="Error">{formState.errors.price?.message}</span>
        </div>

        <div className="form-group">
          <label>Image:</label>
          {vacation && (
            <img src={appConfig.imagesUrl + vacation?.imageName} alt="Vacation" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={imageChange}
            defaultValue={vacation?.imageName}
            {...register("image")}
          />
        </div>

        <button className="update-button">Update</button>
      </form>

      <div className="back-link">
        <NavLink to="/vacations">Back</NavLink>
      </div>
    </div>
  );
}

export default EditVacation;
