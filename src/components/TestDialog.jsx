import * as React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, InputLabel, TextField } from '@mui/material';
import { Box } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlusOneIcon from '@mui/icons-material/PlusOne';

import { ActionDialog } from './ActionDialog';
import { DeleteActionConfirm } from './DeleteActionConfirm';
import { ErrorSnackBar } from './ErrorSnackBar';
import { SuccessSnackbar } from './SuccessSnackbar';

import testService from '../services/tests'

export const TestDialog = ({ open, handleClose, tests, setTests, testIndex }) => {

    const [ActionDialogOpen, setActionDialogOpen] = useState(false);
    const [DeleteActionConfirmOpen, setDeleteActionConfirmOpen] = useState(false);
    const [actions, setActions] = useState([]);
    const [actionIndex, setActionIndex] = useState(null);
    const [name, setName] = useState([]);
    const [url, setUrl] = useState([]);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (testIndex !== null) {
            setName(tests[testIndex].name);
            setUrl(tests[testIndex].url);
        }
    }, [testIndex]);


    const newActionBtnHandler = () => {
        setActionDialogOpen(true);
    }

    function generateList() {
        if (actions.length > 0) {
            return (
                <List>
                    {
                        actions.map((action, index) => {
                            return (
                                <ListItem key={action.name} secondaryAction={
                                    <>
                                        <IconButton onClick={() => handleActionEdit(index)} edge="end" aria-label="edit">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleActionDelete(index)} edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                }
                                >
                                    <ListItemText primary={action.name} />
                                </ListItem>
                            )
                        })
                    }
                </List>
            )
        }
        else return (
            "No actions defined so far"
        )
    }

    const handleActionEdit = (actionIndex) => {
        setActionIndex(actionIndex);
        setActionDialogOpen(true);
    }

    const handleActionDelete = (actionIndex) => {
        setActionIndex(actionIndex);
        setDeleteActionConfirmOpen(true);
    }

    const deleteAction = () => {
        const newActions = [...actions];
        newActions.splice(actionIndex, 1);
        setActions(newActions);
        setDeleteActionConfirmOpen(false);
        setActionIndex(null);
    }

    const cleanUp = () => {
        setActionIndex(null);
        document.getElementById('testName').value = "";
        document.getElementById('testUrl').value = "";
        setName("");
        setUrl("");
    }
    const handleSaveBtn = (event) => {

        event.preventDefault();
       
        if (testIndex === null) {
            if (tests.find(test => test.name === name)) {
                showErrorAlertAndThenVanishIt("The test name must be unique!");
                return;
            }
            //save to site
            const newlyCreatedTest = { name, url, actions };
            testService.create(newlyCreatedTest)
                .then(response => {
                   
                    newlyCreatedTest.id = response.data.id;
                    const newTests = [...tests];
                    newTests.push(newlyCreatedTest);
                    setTests(newTests);
                    cleanUp();
                    showSuccessAlertAndThenVanishIt(`Test saved to DB! 👍`);
                    setTimeout(() => handleClose(), 1000);
                })
                .catch(exception => {
                    showErrorAlertAndThenVanishIt(`Error: ${exception.response ? exception.response.data.error : exception.message}`);
                });
        }
        else {
            const updatedTest = { name, url, actions, id: tests[testIndex].id };
            //TODO check that the updated test and the stored test are the same
            //if they are, then do not update the test in the server
            testService.update(updatedTest)
                .then(response => {
                    
                    const newTests = [...tests];
                    newTests[testIndex] = updatedTest;
                    setTests(newTests);
                    showSuccessAlertAndThenVanishIt(`Test updated to DB! 👍`);
                    cleanUp();
                    setTimeout(() => handleClose(), 1000);
                })
                .catch(exception => {
                    showErrorAlertAndThenVanishIt(`Error: ${exception.response ? exception.response.data.error : exception.message}`);
                });
        }
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
        <Dialog fullWidth={true} maxWidth="md" open={open} onClose={()=>{
            cleanUp();
            handleClose();
        }}>
            <DialogTitle>{testIndex ? "Edit" : "Create New"} Test 🦴 for the doggy</DialogTitle>
            <DialogContent>
                <Fragment>
                    <Box sx={{ minWidth: 120 }}>
                        <form>
                            {/* <form onSubmit={handleSubmit} action={<Link to="/login" />}> */}
                            {/* <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        </Stack> */}
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Name"
                                onChange={e => setName(e.target.value)}
                                value={name}
                                fullWidth
                                required
                                sx={{ mb: 4 }}
                                id="testName"
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Url"
                                onChange={e => setUrl(e.target.value)}
                                value={url}
                                required
                                fullWidth
                                sx={{ mb: 4 }}
                                id="testUrl"
                            />

                            {/* <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Actions</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={personName}
                                    label="Actions"
                                    onChange={handleChange}
                                    required
                                    multiple
                                    sx={{ mb: 4 }}
                                >
                                    <MenuItem key={10} value={10}>Ten</MenuItem>
                                    <MenuItem key={20} value={20}>Twenty</MenuItem>
                                    <MenuItem key={30} value={30}>Thirty</MenuItem>

                                </Select>
                            </FormControl> */}

                            <InputLabel id="actions">Actions</InputLabel>

                            <List dense={true}>
                                {generateList()}
                            </List>

                            <Button variant="contained" sx={{ mb: 4, display: 'block' }} onClick={newActionBtnHandler}>
                                Add new action
                                <PlusOneIcon />
                            </Button>

                            <Button onClick={handleSaveBtn} variant="outlined" color="secondary" type="submit">Save</Button>
                        </form>
                    </Box>
                </Fragment>
                <ActionDialog
                    open={ActionDialogOpen}
                    handleClose={() => {
                        setActionDialogOpen(false);
                    }}
                    setActions={setActions}
                    actions={actions}
                    actionIndex={actionIndex}
                />
            </DialogContent>

            {showErrorAlert && <ErrorSnackBar open={true} message={errorMessage} />}
            {showSuccessAlert && <SuccessSnackbar open={true} message={successMessage} />}
            <DeleteActionConfirm
                open={DeleteActionConfirmOpen}
                handleClose={() => { setDeleteActionConfirmOpen(false) }}
                handleYesCase={deleteAction}
            />

        </Dialog>
    );
};

