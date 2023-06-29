import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";
import authService from "../../../Services/AuthService";


function Register(): JSX.Element {

    const{register,handleSubmit,formState}=useForm<UserModel>()
    const navigate=useNavigate()

    const [emailExists, setEmailExists] = useState<boolean>();

    async function send(user: UserModel) {
        try {
            const exists = await authService.isEmailAddressTaken(user.email);
            if (exists) {
                setEmailExists(true);
                return;
            }
            await authService.register(user);
            alert("Welcome!");
            navigate("/vacations");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(send)}>
            
                <h2>Register</h2>

                <TextField label="First Name" type="text" variant="outlined" className="TextBox" {...register("firstName", UserModel.firstNameValidation )} />
                <span className="SpanMessage">{formState.errors.firstName?.message}</span>

                <TextField label="Last Name" type="text" variant="outlined" className="TextBox" {...register("lastName", UserModel.lastNameValidation)} />
                <span className="SpanMessage">{formState.errors.lastName?.message}</span>

                <TextField label="email" type="email" variant="outlined" className="TextBox" {...register("email",UserModel.emailValidation )} />
                <span className="SpanMessage">{formState.errors.email?.message}</span>
                {emailExists && <span className="SpanUsernameMessage">Username is taken</span>}

                <TextField label="Password" type="password" variant="outlined" className="TextBox" {...register("password", UserModel.passwordValidation)} />
                <span className="SpanMessage">{formState.errors.password?.message}</span>


                <Button type="submit" className="Btn" startIcon={<LoginIcon fontSize="medium" />}>Register</Button>
                </form>
        </div>
    );
}

export default Register;
