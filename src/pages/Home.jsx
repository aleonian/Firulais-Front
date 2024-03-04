import { React, Fragment } from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { ErrorSnackBar } from '../components/ErrorSnackBar';
import { SuccessSnackbar } from '../components/SuccessSnackbar';
import { TemporaryDrawer } from '../components/Navbar/Navbar';
import { TestDialog } from '../components/TestDialog';
import { DeleteActionConfirm } from '../components/DeleteActionConfirm';
import { DataTable } from '../components/DataTable';

import testService from '../services/tests';

export const Home = () => {
    const [user, setUser] = useState(null);
    const [TestDialogOpen, setTestDialogOpen] = useState(false);
    const [DeleteActionConfirmOpen, setDeleteActionConfirmOpen] = useState(false);
    const [tests, setTests] = useState([]);
    const [testIndex, setTestIndex] = useState(null);
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
            setUser(loggedUser);
            testService.getAll()
                .then(testsArray => {
                    setTests(testsArray)
                })
                .catch(error => {
                    showErrorAlertAndThenVanishIt("Something wrong happened fetching the tests: " + error);
                })
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

    const newTestBtnHandler = () => {
        setTestIndex(null);
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

                    <Button
                        sx={{ mb: 4 }}
                        variant="contained"
                        onClick={newTestBtnHandler}>
                        Add new test 🧪
                    </Button>

                    {
                        tests.length > 0 && (
                            <div style={{ height: 'auto', width: '50%' }}>
                                <DataTable
                                    deleteHandler={confirmDeleteTest}
                                    editHandler={editTest}
                                    runHandler={runJob}
                                    rows={tests.map((test, index) => (
                                        {
                                            id: test.id,
                                            name: test.name,
                                            index: index,
                                        }
                                    ))} />
                            </div>
                        )
                    }
                </Box>

                {showErrorAlert && <ErrorSnackBar open={true} message={errorMessage} />}
                {showSuccessAlert && <SuccessSnackbar open={true} message={successMessage} />}

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

                <DeleteActionConfirm
                    open={DeleteActionConfirmOpen}
                    handleClose={() => {

                        setTestIndex(null);
                        setDeleteActionConfirmOpen(false);
                    }}
                    handleYesCase={deleteTest}
                />

            </Fragment >

        )
    }

    const editTest = (index) => {

        setTestIndex(index);
        setTestDialogOpen(true);
    }

    const runJob = (index) => {
        testService.enqueue(tests[index])
        .then(response=>{
            showSuccessAlertAndThenVanishIt(response.data);
        })
        .catch(error=>{
            showErrorAlertAndThenVanishIt(error.response.data.error);
        })
    }

    const confirmDeleteTest = (index) => {
        setTestIndex(index);
        setDeleteActionConfirmOpen(true);
    }

    const deleteTest = () => {

        testService.erase(tests[testIndex])
            .then(response => {
                const newTests = [...tests];
                newTests.splice(testIndex, 1);
                setTests(newTests);
                setDeleteActionConfirmOpen(false);
                setTestIndex(null);
                showSuccessAlertAndThenVanishIt(`Test deleted from DB! 👍`);
                // setTimeout(()=>setDeleteActionConfirmOpen(false), 1000);

            })
            .catch(error => {
                showErrorAlertAndThenVanishIt(error.response.data.error);
                setTimeout(() => setDeleteActionConfirmOpen(false), 1000);
            })
    }

    return (
        <Fragment>
            {user && loggedInHome()}
        </Fragment>
    )
};



