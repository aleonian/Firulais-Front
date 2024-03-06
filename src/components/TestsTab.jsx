// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect, useState, } from "react";

import testService from '../services/tests';
import { ErrorSnackBar } from '../components/ErrorSnackBar';
import { SuccessSnackbar } from '../components/SuccessSnackbar';
import { TestDialog } from '../components/TestDialog';
import { DeleteConfirm } from '../components/DeleteConfirm';
import { TestsDataTable } from '../components/TestsDataTable';

import Button from '@mui/material/Button';

export const TestsTab = () => {
    const [TestDialogOpen, setTestDialogOpen] = useState(false);
    const [DeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [tests, setTests] = useState([]);
    const [testIndex, setTestIndex] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

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
        
    }


    useEffect(() => {

        testService.getAll()
            .then(testsArray => {
                setTests(testsArray)
            })
            .catch(error => {
                showErrorAlertAndThenVanishIt("Something wrong happened fetching the tests: " + error);
            })
    }, []);

    const editTest = (index) => {

        setTestIndex(index);
        setTestDialogOpen(true);
    }

    const runJob = (index) => {
        testService.enqueue(tests[index])
            .then(response => {
                showSuccessAlertAndThenVanishIt(response.data);
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
            .then(response => {
                const newTests = [...tests];
                newTests.splice(testIndex, 1);
                setTests(newTests);
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
        <>
            <Button
                sx={{ mb: 4 }}
                variant="contained"
                onClick={newTestBtnHandler}>
                Add new test 🧪
            </Button>

            <Button
                sx={{ mb: 4, ml: 4 }}
                variant="contained"
                onClick={runAllTestsHandler}>
                Run all tests 🏃‍♂️
            </Button>

            {
                tests.length > 0 && (
                    <div style={{ height: 'auto', width: '100%' }}>
                        <TestsDataTable
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

            <DeleteConfirm
                open={DeleteConfirmOpen}
                handleClose={() => {

                    setTestIndex(null);
                    setDeleteConfirmOpen(false);
                }}
                handleYesCase={deleteTest}
            />
        </>
    )
}