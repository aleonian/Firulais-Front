// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect, useState, } from "react";

import resultService from '../services/results';
import { ErrorSnackBar } from '../components/ErrorSnackBar';
import { SuccessSnackbar } from '../components/SuccessSnackbar';
// import { TestDialog } from '../components/TestDialog';
// import { DeleteActionConfirm } from '../components/DeleteActionConfirm';
import { ResultsDataTable } from '../components/ResultsDataTable';

import Button from '@mui/material/Button';

export const ResultsTab = () => {
    // const [TestDialogOpen, setTestDialogOpen] = useState(false);
    // const [DeleteActionConfirmOpen, setDeleteActionConfirmOpen] = useState(false);
    const [results, setResults] = useState([]);
    const [resultIndex, setTestIndex] = useState(null);
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

    useEffect(() => {
        resultService.getAll()
            .then(resultsArray => {
                setResults(resultsArray)
            })
            .catch(error => {
                showErrorAlertAndThenVanishIt("Something wrong happened fetching the results: " + error);
            })
    }, []);

    const confirmdeleteResult = (index) => {
        setTestIndex(index);
        setDeleteActionConfirmOpen(true);
    }

    const viewResult = ()=> {
        alert('holis!');
    }

    const deleteAllResultsHandler = () => {
        debugger;
    }

    const deleteResult = () => {

        resultService.erase(results[resultIndex])
            .then(response => {
                const newTests = [...results];
                newTests.splice(resultIndex, 1);
                setResults(newTests);
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
                onClick={deleteAllResultsHandler}>
                Delete all results ❌
            </Button>

            {
                results.length > 0 && (
                    <div style={{ height: 'auto', width: '100%' }}>
                        <ResultsDataTable
                            deleteHandler={confirmdeleteResult}
                            viewResultHandler={viewResult}
                            rows={results.map((result, index) => (
                                {
                                    id: result.id,
                                    when: new Date(result.when).toLocaleString(),
                                    name: result.testId.name,
                                    url: result.testId.url,
                                    actions: result.testId.actions,
                                    success: result.outcome.success,
                                    problems: result.outcome.problems ? result.outcome.problems : false,
                                    index: index,
                                }
                            ))} />
                    </div>
                )
            }
            {showErrorAlert && <ErrorSnackBar open={true} message={errorMessage} />}
            {showSuccessAlert && <SuccessSnackbar open={true} message={successMessage} />}

            {/* <TestDialog
                open={TestDialogOpen}
                handleClose={() => {
                    setTestIndex(null);
                    setTestDialogOpen(false);
                }}
                results={results}
                setResults={setResults}
                resultIndex={resultIndex}
            />

            <DeleteActionConfirm
                open={DeleteActionConfirmOpen}
                handleClose={() => {

                    setTestIndex(null);
                    setDeleteActionConfirmOpen(false);
                }}
                handleYesCase={deleteResult}
            /> */}
        </>
    )
}