// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

import loginService from '../services/login';
import testService from '../services/tests';
import resultService from '../services/results';

import { MyAlert } from './MyAlert';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Telesign
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export function LoginComponent() {

    const [loginErrorMessage, setLoginErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const user = await loginService.login({
                username: data.get('username'),
                password: data.get('password')
            })

            window.localStorage.setItem('loggedFirulaisUser', JSON.stringify(user));
            testService.setToken(user.token);
            resultService.setToken(user.token);
            // setUser(user)
            navigate('/');
        } catch (exception) {
            setLoginErrorMessage(exception.response.data.error)
            setTimeout(() => {
                setLoginErrorMessage(null)
            }, 5000)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1 }}>
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main'  */}
                    🐶
                </Avatar>
                <Typography component="h1" variant="h5">
                    Welcome to Firulais, please sign in.
                </Typography>

                {loginErrorMessage ? <MyAlert severity="error" message={loginErrorMessage} /> : ""}

                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}