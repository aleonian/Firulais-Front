// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect, useState, } from "react";

import resultService from '../services/results';
import { ErrorSnackBar } from '../components/ErrorSnackBar';
import { SuccessSnackbar } from '../components/SuccessSnackbar';
import { ResultDialog } from '../components/ResultDialog';
// import { DeleteActionConfirm } from '../components/DeleteActionConfirm';
import { ResultsDataTable } from '../components/ResultsDataTable';

import Button from '@mui/material/Button';

export const ResultsTab = () => {
    const [resultDialogOpen, setResultDialogOpen] = useState(false);
    // const [DeleteActionConfirmOpen, setDeleteActionConfirmOpen] = useState(false);
    const [results, setResults] = useState([]);
    const [resultIndex, setResultIndex] = useState(null);
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
        let processedResultsArray = [];
        resultService.getAll()
            .then(resultsArray => {
                processedResultsArray = resultsArray.map((result, index) => {
                    return {
                        id: result.id,
                        when: new Date(result.when).toLocaleString(),
                        name: result.testId.name,
                        url: result.testId.url,
                        actions: result.testId.actions,
                        success: result.outcome.success,
                        problems: result.outcome.problems ? result.outcome.problems : false,
                        index: index,
                    }
                });
                debugger;
                setResults(processedResultsArray)
            })
            .catch(error => {
                showErrorAlertAndThenVanishIt("Something wrong happened fetching the results: " + error);
            })
    }, []);

    const confirmdeleteResult = (index) => {
        setResultIndex(index);
        setDeleteActionConfirmOpen(true);
    }

    const viewResult = (index) => {
        setResultIndex(index);
        setResultDialogOpen(true);
    }

    const deleteAllResultsHandler = () => {
        
    }

    const deleteResult = () => {

        resultService.erase(results[resultIndex])
            .then(response => {
                const newTests = [...results];
                newTests.splice(resultIndex, 1);
                setResults(newTests);
                setDeleteActionConfirmOpen(false);
                setResultIndex(null);
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
                            rows={results} />
                    </div>
                )
            }
            {showErrorAlert && <ErrorSnackBar open={true} message={errorMessage} />}
            {showSuccessAlert && <SuccessSnackbar open={true} message={successMessage} />}

            <ResultDialog
                open={resultDialogOpen}
                handleClose={() => {
                    setResultIndex(null);
                    setResultDialogOpen(false);
                }}
                results={results}
                setResults={setResults}
                resultIndex={resultIndex}
            />

            {/* <DeleteActionConfirm
                open={DeleteActionConfirmOpen}
                handleClose={() => {

                    setResultIndex(null);
                    setDeleteActionConfirmOpen(false);
                }}
                handleYesCase={deleteResult}
            /> */}
        </>
    )
}