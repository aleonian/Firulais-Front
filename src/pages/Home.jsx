import { React, Fragment } from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { TemporaryDrawer } from '../components/Navbar/Navbar';

import Button from '@mui/material/Button';

export const Home = () => {
    const [user, setUser] = useState(null);
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

    const loggedInHome = () => {
        return (
            <Fragment>
                <TemporaryDrawer />
                <h1>Welcome to Firulais</h1>
                <Button variant="contained">Hello world</Button>
            </Fragment>
        )
    }

    return (
        <Fragment>
            {user && loggedInHome()}
        </Fragment>
    )
};



