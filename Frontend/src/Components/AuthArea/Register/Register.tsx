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
            navigate("/home");
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="Register">

            <form onSubmit={handleSubmit(send)}></form>
            
                <h2>Register</h2>

                <TextField label="First Name" type="text" variant="outlined" className="TextBox" {...register("firstName", {
                    required: { value: true, message: "Missing first name!" },
                    minLength: { value: 2, message: "First name must be minimum 2 chars" },
                    maxLength: { value: 100, message: "First name can't exceed 100 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.firstName?.message}</span>

                <TextField label="Last Name" type="text" variant="outlined" className="TextBox" {...register("lastName", {
                    required: { value: true, message: "Missing last name!" },
                    minLength: { value: 2, message: "Last name must be minimum 2 chars" },
                    maxLength: { value: 100, message: "Last name can't exceed 100 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.lastName?.message}</span>

                <TextField label="email" type="email" variant="outlined" className="TextBox" {...register("email", {
                    required: { value: true, message: "Missing username!" },
                    minLength: { value: 4, message: "Username must be minimum 4 chars" },
                    maxLength: { value: 100, message: "Username can't exceed 100 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.email?.message}</span>
                {emailExists && <span className="SpanUsernameMessage">Username is taken</span>}

                <TextField label="Password" type="password" variant="outlined" className="TextBox" {...register("password", {
                    required: { value: true, message: "Missing password!" },
                    minLength: { value: 4, message: "Password  must be minimum 4 chars" },
                    maxLength: { value: 128, message: "Password can't exceed 128 chars" }
                })} />
                <span className="SpanMessage">{formState.errors.password?.message}</span>

                <Button type="submit" className="Btn" startIcon={<LoginIcon fontSize="medium" />}>Register</Button>
			
        </div>
    );
}

export default Register;
