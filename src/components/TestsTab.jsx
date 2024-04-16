// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect, useState, } from "react";

import testService from '../services/tests';
import { ErrorSnackBar } from '../components/ErrorSnackBar';
import { SuccessSnackbar } from '../components/SuccessSnackbar';
import { TestDialog } from '../components/TestDialog';
import { DeleteConfirm } from '../components/DeleteConfirm';
import { TestsDataTableFilter } from '../components/TestsDataTableFilter';
import { TestsDataTable } from '../components/TestsDataTable';

import { wait } from "../util/tools";
import io from 'socket.io-client';


import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export const TestsTab = () => {
    const [TestDialogOpen, setTestDialogOpen] = useState(false);
    const [DeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [tests, setTests] = useState(null);
    const [testIndex, setTestIndex] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [testStateUpdateTimer, setTestStateUpdateTimer] = useState(null);
    const [busy, setBusy] = useState(false);
    let socket;

    useEffect(() => {
        testService.getAll()
            .then(testsArray => {
                setTests(testsArray);
                connectToWS();
            })
            .catch(error => {
                showErrorAlertAndThenVanishIt("Something wrong happened fetching the tests: " + error);
            })
    }, []);

    const connectToWS = () => {
        

        const socket = io(import.meta.env.VITE_APP_WS_SERVER);

        socket.on('connect_error', (error) => {
            console.log("Error ws: ", error)
        })

        socket.on('taskStatus', (testObject) => {
            updateTestState(testObject);
        })
        socket.on('disconnect', ()=>{
            socket.disconnect();
        })
        socket.on('connect', ()=>{
            console.log("Connected to the backend!")
        })
    }
    // useEffect(() => {
    //     

    //     if (socket) return;

    //     const socket = io(import.meta.env.VITE_APP_WS_SERVER);

    //     socket.on('connect_error', (error) => {
    //         console.log("Error ws: ", error)
    //     })

    //     socket.on('taskStatus', (testObject) => {
    //         updateTestState(testObject);
    //     })
    //     // Clean up
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, [tests]);

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

    const runAllTestsHandler = () => {
        testService.runAll()
            .then(() => {
                showSuccessAlertAndThenVanishIt("All tests enqueued!");
            })
            .catch(error => {
                showErrorAlertAndThenVanishIt(error.response.data.error);
            })
    }

    const updateTestState = (testObject) => {
        
        setTests((prevTests) => {
            const newTests = [...prevTests];
            const updatedTestIndex = newTests.findIndex(test => test.id === testObject.id);
            if (updatedTestIndex !== -1) {
                newTests[updatedTestIndex] = testObject;
            }
            return newTests;
        });
    }

    

    const editTest = (index) => {

        setTestIndex(index);
        setTestDialogOpen(true);
    }

    const runJob = (index) => {
        testService.enqueue(tests[index])
            .then(response => {
                showSuccessAlertAndThenVanishIt(response.data);
                // now we have to somehow check every second and update the corresponding 
                // 'state' icon for the running task
                // setBusy(true);
                // wait(3000)
                //     .then(() => {
                //         const testStateUpdateTimer = setInterval(() => { updateTestState(index) }, 2000);
                //         setTestStateUpdateTimer(testStateUpdateTimer);
                //     })
            })
            .catch(error => {
                showErrorAlertAndThenVanishIt(error.response.data.error);
            })
    }

    const confirmDeleteTest = (index) => {
        setTestIndex(index);
        setDeleteConfirmOpen(true);
    }

    const deleteTest = () => {

        testService.erase(tests[testIndex])
            .then(() => {
                setTests((prevTests) => {
                    const newTests = [...prevTests];
                    newTests.splice(testIndex, 1);
                    return newTests;
                });
                setDeleteConfirmOpen(false);
                setTestIndex(null);
                showSuccessAlertAndThenVanishIt(`Test deleted from DB! 👍`);
                // setTimeout(()=>setDeleteConfirmOpen(false), 1000);

            })
            .catch(error => {
                showErrorAlertAndThenVanishIt(error.response.data.error);
                setTimeout(() => setDeleteConfirmOpen(false), 1000);
            })
    }

    return (
        <div>
            <ButtonGroup>
                <Button
                    sx={{ mb: 4, mr: 4 }}
                    variant="contained"
                    onClick={newTestBtnHandler}>
                    Add new test 🧪
                </Button>

                <Button
                    sx={{ mb: 4 }}
                    variant="contained"
                    onClick={runAllTestsHandler}>
                    Run all tests 🏃‍♂️
                </Button>
            </ButtonGroup>
            {
                tests && tests.length > 0 && (
                    <div style={{ height: 'auto', width: '100%' }}>
                        <TestsDataTableFilter
                            deleteHandler={confirmDeleteTest}
                            editHandler={editTest}
                            runHandler={runJob}
                            rows={tests.map((test, index) => (
                                {
                                    id: test.id,
                                    name: test.name,
                                    index: index,
                                    state: test.state,
                                }
                            ))} />
                    </div>
                )
            }
            {showErrorAlert && <ErrorSnackBar open={true} message={errorMessage} />}
            {showSuccessAlert && <SuccessSnackbar open={true} message={successMessage} />}

            <TestDialog
                open={TestDialogOpen}
                handleClose={() => {
                    setTestDialogOpen(false);
                    setTestIndex(null);
                }}
                tests={tests}
                setTests={setTests}
                testIndex={testIndex}
            />

            <DeleteConfirm
                open={DeleteConfirmOpen}
                handleClose={() => {
                    setTestIndex(null);
                    setDeleteConfirmOpen(false);
                }}
                handleYesCase={deleteTest}
            />
        </div>
    )
}