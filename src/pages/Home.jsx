// eslint-disable-next-line no-unused-vars
import { React, Fragment } from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ErrorSnackBar } from '../components/ErrorSnackBar';
import { SuccessSnackbar } from '../components/SuccessSnackbar';
import { TemporaryDrawer } from '../components/Navbar/Navbar';
import { BasicTabs } from '../components/BasicTabs';

import testService from '../services/tests';
import resultService from '../services/results';

export const Home = () => {
    const [user, setUser] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        let loggedUser = window.localStorage.getItem("loggedFirulaisUser");
        if (loggedUser) {
            loggedUser = JSON.parse(loggedUser);
            testService.setToken(loggedUser.token);
            resultService.setToken(loggedUser.token);
            setUser(loggedUser);
        }
        else {
            navigate('/login');
        }
    }, []);

    const showErrorAlertAndThenVanishIt = (errorMessage) => {
        setErrorMessage(errorMessage);
        setShowErrorAlert(true);
        setTimeout(() => setShowErrorAlert(false), 1500);
    }

    const showSuccessAlertAndThenVanishIt = (successMessage) => {
        setSuccessMessage(successMessage);
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 1500);
    }

    const loggedInHome = () => {
        return (
            <Fragment>
                <Box>
                    <TemporaryDrawer />
                </Box>
                <Box
                    sx={{
                        marginTop: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Typography component="h1" variant="h3">
                        Welcome to Firulais
                    </Typography>
                    <Typography component="h3" variant="h5">
                        your friendly QA automation puppy 🐶
                    </Typography>

                    <BasicTabs />
                </Box>

                {showErrorAlert && <ErrorSnackBar open={true} message={errorMessage} />}
                {showSuccessAlert && <SuccessSnackbar open={true} message={successMessage} />}

            </Fragment >

        )
    }

    return (
        <Fragment>
            {user && loggedInHome()}
        </Fragment>
    )
};



