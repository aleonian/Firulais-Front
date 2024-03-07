// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect, useState, } from "react";

import resultService from '../services/results';
import { ErrorSnackBar } from '../components/ErrorSnackBar';
import { SuccessSnackbar } from '../components/SuccessSnackbar';
import { ResultDialog } from '../components/ResultDialog';
import { DeleteConfirm } from '../components/DeleteConfirm';
import { ResultsDataTable } from '../components/ResultsDataTable';

import Button from '@mui/material/Button';

export const ResultsTab = () => {
    const [resultDialogOpen, setResultDialogOpen] = useState(false);
    const [deleteResultConfirmOpen, setDeleteResultConfirmOpen] = useState(false);
    const [deleteAllResultsConfirmOpen, setdeleteAllResultsConfirmOpen] = useState(false);
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
                    let stats = {
                        totalCommands: 0,
                        failedCommands: 0,
                        successfullCommands: 0,
                    }
                    for (let i = 0; i < result.testId.actions.length; i++) {
                        const list = result.testId.actions[i].commands.split("\n");
                        result.testId.actions[i].list = list;
                        stats.totalCommands += list.length;
                    }

                    stats.failedCommands = result.outcome.problems ? result.outcome.problems.length : 0;
                    stats.successfullCommands = stats.totalCommands - stats.failedCommands;
                    result.stats = stats;

                    return {
                        id: result.id,
                        when: new Date(result.when).toLocaleString(),
                        name: result.testId.name,
                        url: result.testId.url,
                        actions: result.outcome.actions,
                        success: result.outcome.success,
                        problems: result.outcome.problems ? result.outcome.problems : false,
                        stats,
                        index: index,
                    }
                });
                setResults(processedResultsArray)
            })
            .catch(error => {
                showErrorAlertAndThenVanishIt("Something wrong happened fetching the results: " + error);
            })
    }, []);

    const confirmdeleteResult = (index) => {

        setResultIndex(index);
        setDeleteResultConfirmOpen(true);
    }

    const confirmdeleteAllResults = () => {

        setdeleteAllResultsConfirmOpen(true);
    }



    const viewResult = (index) => {
        
        setResultIndex(index);
        setResultDialogOpen(true);
    }

    const deleteAllResultsHandler = () => {
        resultService.eraseAll()
            .then(() => {
                showSuccessAlertAndThenVanishIt(`Results deleted from DB! 👍`);
                setdeleteAllResultsConfirmOpen(false);
                setResults([]);
            })
            .catch(error => {
                showErrorAlertAndThenVanishIt(error.response.data.error);
                setTimeout(() => setDeleteResultConfirmOpen(false), 1000);
            })
    }

    const deleteResult = () => {

        resultService.erase(results[resultIndex])
            .then(() => {

                const newResults = [...results];
                newResults.splice(resultIndex, 1);
                setResults(newResults);
                setDeleteResultConfirmOpen(false);
                setResultIndex(null);
                showSuccessAlertAndThenVanishIt(`Result deleted from DB! 👍`);
                // setTimeout(()=>setDeleteResultConfirmOpen(false), 1000);

            })
            .catch(error => {
                showErrorAlertAndThenVanishIt(error.response.data ? error.response.data.error : error.message);
                setTimeout(() => setDeleteResultConfirmOpen(false), 1000);
            })
    }

    return (
        <>
            <Button
                sx={{ mb: 4 }}
                variant="contained"
                onClick={confirmdeleteAllResults}>
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

            <DeleteConfirm
                open={deleteResultConfirmOpen}
                handleClose={() => {
                    setResultIndex(null);
                    setDeleteResultConfirmOpen(false);
                }}
                handleYesCase={deleteResult}
            />
            <DeleteConfirm
                open={deleteAllResultsConfirmOpen}
                handleClose={() => {
                    setdeleteAllResultsConfirmOpen(false);
                }}
                handleYesCase={deleteAllResultsHandler}
            />
        </>
    )
}