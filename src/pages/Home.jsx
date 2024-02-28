import { React, Fragment } from 'react';
import { useState, useEffect } from 'react'
import { Login } from '../components/Login';
import Button from '@mui/material/Button';
import { TemporaryDrawer } from '../components/Navbar/Navbar';

export const Home = () => {
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')
    const [user, setUser] = useState(null);
    // const [successMessage, setSuccessMessage] = useState(null);
    // const [errorMessage, setErrorMessage] = useState(null);

    // useEffect(() => {
    //     if (user !== null) {
    //         blogService.getAll().then(blogs =>
    //             setBlogs(blogs)
    //         );
    //     }
    // }, [user]);

    useEffect(() => {
        let loggedUser = window.localStorage.getItem("loggedFirulaisUser");
        if (loggedUser) {
            loggedUser = JSON.parse(loggedUser);
            // blogService.setToken(loggedUser.token);
            setUser(loggedUser);
        }
    }, [])

    const loggedInHome = () => {
        return (
            <Fragment>
                <TemporaryDrawer />
                <h1>Welcome to Firulais</h1>
                <Button variant="contained">Hello world</Button>
            </Fragment>
        )
    }

    const loginForm = () => {
        return (
            <Login />
        )
    }

    return (
        <Fragment>
            {!user && loginForm()}
            {user && loggedInHome()}
        </Fragment>
    )
};



