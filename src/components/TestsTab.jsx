import React from "react";
import { useEffect, useState, } from "react";

import testService from '../services/tests';
import { ErrorSnackBar } from '../components/ErrorSnackBar';
import { SuccessSnackbar } from '../components/SuccessSnackbar';
import { TestDialog } from '../components/TestDialog';
import { DeleteActionConfirm } from '../components/DeleteActionConfirm';
import { DataTable } from '../components/DataTable';

import Button from '@mui/material/Button';

export const TestsTab = () => {
    const [TestDialogOpen, setTestDialogOpen] = useState(false);
    const [DeleteActionConfirmOpen, setDeleteActionConfirmOpen] = useState(false);
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


    useEffect(() => {

        debugger;
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
        <>
            <Button
                sx={{ mb: 4 }}
                variant="contained"
                onClick={newTestBtnHandler}>
                Add new test 🧪
            </Button>

            {
                tests.length > 0 && (
                    <div style={{ height: 'auto', width: '100%' }}>
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
        </>
    )
}