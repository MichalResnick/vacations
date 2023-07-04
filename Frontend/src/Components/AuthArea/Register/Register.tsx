import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  Box,
  Grid,
  Avatar,
  CssBaseline,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserModel from '../../../Models/UserModel';
import authService from '../../../Services/AuthService';
import notifyService from '../../../Services/NotifyService';

function RegisterSide(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<UserModel>();
  const navigate = useNavigate();

  const [emailExists, setEmailExists] = useState<boolean>();

  async function send(user: UserModel) {
    try {
      const exists = await authService.isEmailAddressTaken(user.email);
      if (exists) {
        setEmailExists(true);
        return;
      }
      await authService.register(user);
      notifyService.success('Welcome!');
      navigate('/vacations');
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#e1f5fe',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit(send)} sx={{ mt: 1 }}>
              <TextField
                label="First Name"
                type="text"
                variant="outlined"
                margin="normal"
                fullWidth
                autoFocus
                {...register('firstName', UserModel.firstNameValidation)}
              />
              <span className="SpanMessage">{formState.errors.firstName?.message}</span>

              <TextField
                label="Last Name"
                type="text"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register('lastName', UserModel.lastNameValidation)}
              />
              <span className="SpanMessage">{formState.errors.lastName?.message}</span>

              <TextField
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register('email', UserModel.emailValidation)}
              />
              <span className="SpanMessage">{formState.errors.email?.message}</span>
              {emailExists && (
                <span className="SpanEmailMessage">This email already exists in the system</span>
              )}

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                {...register('password', UserModel.passwordValidation)}
              />
              <span className="SpanMessage">{formState.errors.password?.message}</span>

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Register
              </Button>

              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {'Already have an account? Sign In'}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Typography variant="body2" color="text.secondary" align="center">
                  {'Copyright © '}
                  <Link color="inherit">
                    Vacations-Michal Resnick
                  </Link>{' '}
                  {new Date().getFullYear()}
                  {'.'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default RegisterSide;
