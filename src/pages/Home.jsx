import { React, Fragment } from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import Button from '@mui/material/Button';

import { ErrorSnackBar } from '../components/ErrorSnackBar';
import { TemporaryDrawer } from '../components/Navbar/Navbar';
import { TestDialog } from '../components/TestDialog';

import testService from '../services/tests';

export const Home = () => {
    const [user, setUser] = useState(null);
    const [TestDialogOpen, setTestDialogOpen] = useState(false);
    const [tests, setTests] = useState([]);
    const [testIndex, setTestIndex] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        let loggedUser = window.localStorage.getItem("loggedFirulaisUser");
        if (loggedUser) {
            loggedUser = JSON.parse(loggedUser);
            testService.setToken(loggedUser.token);
            setUser(loggedUser);
            testService.getAll()
                .then(testsArray => {
                    setTests(testsArray)
                })
                .catch(error => {
                    setErrorMessage("Something wrong happened fetching the tests: " + error);
                    showErrorAlertAndThenVanishIt();
                })
        }
        else {
            navigate('/login');
        }
    }, []);

    const showErrorAlertAndThenVanishIt = () => {
        setShowErrorAlert(true);
        setTimeout(() => setShowErrorAlert(false), 5000);
    }

    const newTestBtnHandler = () => {
        setTestDialogOpen(true);
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

                    {
                        tests.length > 0 && (
                            <>
                                Tests:
                                <div>
                                    {tests.map((test, index) => (
                                        <div key={index}>
                                            {test.name}
                                            <button onClick={() => { editTest(index) }}>Edit</button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )
                    }



                </Box>

                {showErrorAlert && <ErrorSnackBar open={true} message={errorMessage} />}

                <TestDialog
                    open={TestDialogOpen}
                    handleClose={() => {
                        setTestIndex(null);
                        setTestDialogOpen(false);
                    }}
                    tests={tests}
                    setTests={setTests}
                    testIndex={testIndex}
                />

            </Fragment >

        )
    }

    const editTest = (index) => {
        setTestIndex(index);
        setTestDialogOpen(true);
    }
    return (
        <Fragment>
            {user && loggedInHome()}
        </Fragment>
    )
};



