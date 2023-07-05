import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import { Button, TextField, TextareaAutosize, Typography, Grid, Box } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

import useVerifyAdmin from "../../../Utils/UseVerifyAdmin";
import vacationsService from "../../../Services/VacationsService";

import "./AddVacation.css";

function AddVacation(): JSX.Element {
  useVerifyAdmin();

  const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
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
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <Box
      className="AddVacation"
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('path/to/background-image.jpg')",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          width: "500px",
          p: 4,
          borderRadius: 8,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
      <form onSubmit={handleSubmit(send)}>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          Add Vacation
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Target"
              fullWidth
              {...register("target", VacationModel.targetValidation)}
              />
              <span className="SpanMessage">{formState.errors.target?.message}</span>
          </Grid>

          <Grid item xs={12}>
            <TextareaAutosize
              minRows={3}
              maxRows={6}
              placeholder="Enter description"
              className="AddTextarea"
              {...register("description", VacationModel.descriptionValidation)}
              />
              <span className="SpanMessage">{formState.errors.description?.message}</span>
          
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              {...register("startDate", VacationModel.startDateValidation)}
              />
              <span className="SpanMessage">{formState.errors.startDate?.message}</span>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              {...register("endDate", VacationModel.endDateValidation)}
              />
              <span className="SpanMessage">{formState.errors.endDate?.message}</span>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Price"
              type="number"
              fullWidth
              {...register("price", VacationModel.priceValidation)}
              />
              <span className="SpanMessage">{formState.errors.price?.message}</span>
          </Grid>

          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: { value: true, message: "Missing image" },
              })}
            />
            <span className="SpanImageMessage">{formState.errors.image?.message}</span>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<AddCircleIcon />}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>

      <Typography variant="subtitle1" align="center">
        <NavLink to="/vacations">Back</NavLink>
      </Typography>
    </Box>
    </Box>
  );
}

export default AddVacation;
