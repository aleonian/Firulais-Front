import { React, Fragment } from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import Button from '@mui/material/Button';


import { TemporaryDrawer } from '../components/Navbar/Navbar';
import { NewTestDialog } from '../components/NewTestDialog';


export const Home = () => {
    const [user, setUser] = useState(null);
    const [newTestDialogOpen, setNewTestDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        let loggedUser = window.localStorage.getItem("loggedFirulaisUser");
        if (loggedUser) {
            loggedUser = JSON.parse(loggedUser);
            // blogService.setToken(loggedUser.token);
            setUser(loggedUser);
        }
        else {

            navigate('/login');
        }
    }, []);

    const newTestBtnHandler = () => {
        setNewTestDialogOpen(true);
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
                    <Typography component="h1" variant="h2">
                        Welcome to Firulais
                    </Typography>
                    <Typography component="h3" variant="h5">
                        your friendly QA automation puppy 🐶
                    </Typography>
                </Box>

                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>

                    <Button variant="contained" onClick={newTestBtnHandler}>
                        Add new test
                        <PlusOneIcon />
                    </Button>
                </Box>

                <NewTestDialog open={newTestDialogOpen} handleClose={() => {
                    setNewTestDialogOpen(false);
                }} />

            </Fragment>

        )
    }

    return (
        <Fragment>
            {user && loggedInHome()}
        </Fragment>
    )
};



