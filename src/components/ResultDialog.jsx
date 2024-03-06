// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { Fragment, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { Box } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Grid } from '@mui/material';

import { DeleteConfirm } from './DeleteConfirm';
import { ErrorSnackBar } from './ErrorSnackBar';
import { SuccessSnackbar } from './SuccessSnackbar';
import { ProblemsDatatAble } from './ProblemsDatatAble';

export const ResultDialog = ({ open, handleClose, results, resultIndex }) => {



    const [DeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [actions, setActions] = useState([]);
    const [actionIndex, setActionIndex] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    // useEffect(() => {
    //     if (resultIndex !== null) {
    //         setName(results[resultIndex].name);
    //         setUrl(results[resultIndex].url);
    //         setActions(results[resultIndex].actions);
    //     }
    //     else {
    //         setName("");
    //         setUrl("");
    //         setActions([]);
    //     }
    // }, [resultIndex]);


    function generateActionsList() {
        if (resultIndex != null) {
            if (results[resultIndex].actions.length > 0) {
                return (
                    <List>
                        {
                            results[resultIndex].actions.map((action, index) => {
                                return (
                                    <ListItem key={`${action.name}-${index}`}>
                                        <ListItemText primary={action.name} />
                                        <List>
                                            {
                                                action.commands.split("\n").map((command, index) => {
                                                    return (
                                                        <ListItem key={`${command}-${index}`}>

                                                            <ListItemText primary={command} />
                                                        </ListItem>
                                                    )
                                                })
                                            }
                                        </List>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                )
            }
            else return (
                "No actions defined so far?"
            )
        }
    }
    // function generateProblemsList() {
    //     if (resultIndex != null) {
    //         
    //         if (results[resultIndex].problems.length > 0) {
    //             return (
    //                 <List>
    //                     {
    //                         results[resultIndex].problems.map((problem, index) => {
    //                             return (
    //                                 <ListItem key={problem.name}>
    //                                     <ListItemText primary={problem.problemType} />
    //                                     <ListItemText primary={problem.errorMessage} />
    //                                     <ListItemText primary={problem.messageType ? problem.messageType : ""} />
    //                                     <ListItemText primary={problem.logMessage ? problem.logMessage : ""} />
    //                                 </ListItem>
    //                             )
    //                         })
    //                     }
    //                 </List>
    //             )
    //         }
    //         else return (
    //             "No actions defined so far?"
    //         )
    //     }
    // }

    const deleteAction = () => {
        const newActions = [...actions];
        newActions.splice(actionIndex, 1);
        setActions(newActions);
        setDeleteConfirmOpen(false);
        setActionIndex(null);
    }

    const cleanUp = () => {
        // setActionIndex(null);
        // document.getElementById('testName').value = "";
        // document.getElementById('testUrl').value = "";
        // setName("");
        // setUrl("");
        // setActions([]);
    }
    const showSuccessAlertAndThenVanishIt = (successMessage) => {
        setSuccessMessage(successMessage);
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 1500);
    }

    const showErrorAlertAndThenVanishIt = (errorMessage) => {
        setErrorMessage(errorMessage);
        setShowErrorAlert(true);
        setTimeout(() => setShowErrorAlert(false), 1500);
    }

    return (
        <Dialog fullWidth={true} maxWidth="md" open={open} onClose={() => {
            cleanUp();
            handleClose();
        }}>
            <DialogTitle>Results details</DialogTitle>
            <DialogContent>
                <Fragment>
                    <Box sx={{ minWidth: 120 }}>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="testName"
                                    required
                                    fullWidth
                                    id="testName"
                                    autoFocus
                                    value={resultIndex != null && results[resultIndex].name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="when"
                                    value={resultIndex != null && results[resultIndex].when}
                                    name="when"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="result"
                                    value={resultIndex != null && results[resultIndex].success ? "👍" : "👎"}
                                    name="result"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="url"
                                    value={resultIndex != null && results[resultIndex].url}
                                    id="url"
                                />
                            </Grid>

                            {
                                resultIndex != null && results[resultIndex].problems &&
                                <Grid item xs={12}>
                                    <ProblemsDatatAble
                                        rows={
                                            results[resultIndex].problems
                                                .map((problem, index) => {
                                            debugger;

                                                    return { ...problem, id: `${problem.errorMessage} - ${index}` }
                                                })
                                        } />
                                </Grid>
                            }

                            <Grid item xs={12} sm={6}>
                                Actions:
                                <List dense={true}>
                                    {generateActionsList()}
                                </List>
                            </Grid>

                        </Grid>
                    </Box>
                </Fragment>
                {/* <ActionDialog
                    open={ActionDialogOpen}
                    handleClose={() => {
                        setActionDialogOpen(false);
                    }}
                    setActions={setActions}
                    actions={actions}
                    actionIndex={actionIndex}
                    setActionIndex={setActionIndex}
                /> */}
            </DialogContent>

            {showErrorAlert && <ErrorSnackBar open={true} message={errorMessage} />}
            {showSuccessAlert && <SuccessSnackbar open={true} message={successMessage} />}
            <DeleteConfirm
                open={DeleteConfirmOpen}
                handleClose={() => { setDeleteConfirmOpen(false) }}
                handleYesCase={deleteAction}
            />

        </Dialog >
    );
};

