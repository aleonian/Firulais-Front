// eslint-disable-next-line no-unused-vars
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
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { ActionDialog } from './ActionDialog';
import { DeleteConfirm } from './DeleteConfirm';
import { ErrorSnackBar } from './ErrorSnackBar';
import { SuccessSnackbar } from './SuccessSnackbar';

import testService from '../services/tests'

export const TestDialog = ({ open, handleClose, tests, setTests, testIndex }) => {

    const [ActionDialogOpen, setActionDialogOpen] = useState(false);
    const [DeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [actions, setActions] = useState([]);
    const [actionIndex, setActionIndex] = useState(null);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [authIsChecked, setAuthIsChecked] = useState(false);
    const [authUser, setAuthUser] = useState("");
    const [authPass, setAuthPass] = useState("");
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (testIndex !== null) {
            setName(tests[testIndex].name);
            setUrl(tests[testIndex].url);
            setActions(tests[testIndex].actions);
            if (tests[testIndex].requiresAuth) {
                setAuthIsChecked(true);
                setAuthUser(tests[testIndex].authUser);
                setAuthPass(tests[testIndex].authPass);
            }
            else setAuthIsChecked(false);
        }
        else {
            setName("");
            setUrl("");
            setActions([]);
            setAuthUser("");
            setAuthPass("");
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
                                <ListItem style={{ backgroundColor: "lightblue" }} key={action.name} secondaryAction={
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

    const handleActionEdit = (index) => {
        setActionIndex(index);
        setActionDialogOpen(true);
    }

    const handleActionDelete = (index) => {
        setActionIndex(index);
        setDeleteConfirmOpen(true);
    }

    const deleteAction = () => {
        const newActions = [...actions];
        newActions.splice(actionIndex, 1);
        setActions(newActions);
        setDeleteConfirmOpen(false);
        setActionIndex(null);
    }

    const cleanUp = () => {

        setActionIndex(null);
        setName("");
        setUrl("");
        setActions([]);
    }
    const handleSaveBtn = (event) => {

        event.preventDefault();

        if (actions.length < 1) {
            showErrorAlertAndThenVanishIt("You must add at least one action!");
            return;
        }
        const newlyCreatedTest = { name, url, actions };

        // if auth checkbox is checked, then make sure authUser and authPass are not empty
        if (authIsChecked) {
            if (!authUser || authUser.length < 1) {
                showErrorAlertAndThenVanishIt("The auth username cannot be empty!");
                return;
            }
            if (!authPass || authPass.length < 1) {
                showErrorAlertAndThenVanishIt("The auth password cannot be empty!");
                return;
            }
            newlyCreatedTest.requiresAuth = true;
            newlyCreatedTest.authUser = authUser;
            newlyCreatedTest.authPass = authPass;
        }
        else {
            newlyCreatedTest.requiresAuth = false;
            newlyCreatedTest.authUser = null;
            newlyCreatedTest.authPass = null;
        }

        if (testIndex === null) {
            if (tests.find(test => test.name === name)) {
                showErrorAlertAndThenVanishIt("The test name must be unique!");
                return;
            }
            //save to site
            testService.create(newlyCreatedTest)
                .then(response => {
                    newlyCreatedTest.id = response.data.id;
                    const newTests = [...tests];
                    newTests.push(newlyCreatedTest);
                    setTests(newTests);
                    showSuccessAlertAndThenVanishIt(`Test saved to DB! 👍`);
                    setTimeout(() => handleClose(), 1000);
                    setTimeout(() => cleanUp(), 500);
                })
                .catch(exception => {
                    showErrorAlertAndThenVanishIt(`Error: ${exception.response ? exception.response.data.error : exception.message}`);
                });
        }
        else {
            const updatedTest = {
                name,
                url,
                actions,
                id: tests[testIndex].id,
                authUser: authIsChecked ? authUser : null,
                authPass: authIsChecked ? authPass : null,
                requiresAuth: authIsChecked
            };
            //TODO check that the updated test and the stored test are the same
            //if they are, then do not update the test in the server
            testService.update(updatedTest)
                .then(() => {
                    const newTests = [...tests];
                    newTests[testIndex] = updatedTest;
                    setTests(newTests);
                    showSuccessAlertAndThenVanishIt(`Test updated to DB! 👍`);
                    setTimeout(() => handleClose(), 1000);
                    setTimeout(() => cleanUp(), 500);
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

    const handleAuthCheckbox = (event) => {
        setAuthIsChecked(authIsChecked => !authIsChecked);
    }

    return (
        <Dialog fullWidth={true} maxWidth="md" open={open} onClose={() => {
            handleClose();
            setTimeout(() => cleanUp(), 500);
        }}>
            <DialogTitle>
                <div className='dialog-title'>
                    <div className='text'>
                        {testIndex != null ? "Edit" : "Create New"} Test 🦴 for the doggy
                    </div>
                    <div className='buttons'>
                        <Button onClick={handleClose} variant="outlined" sx={{ bgcolor: 'red', color: 'white' }} type="submit">Cancel</Button>
                        <Button onClick={handleSaveBtn} variant="outlined" sx={{ bgcolor: 'green', color: 'white' }} type="submit">Save</Button>
                    </div>
                </div>
            </DialogTitle>
            <DialogContent>
                <Fragment>
                    <Box sx={{ minWidth: 120 }}>
                        <form>
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

                            {/* here's the auth checkbox  */}
                            <FormControlLabel
                                control={<Checkbox color="primary" onChange={handleAuthCheckbox} checked={authIsChecked} />}
                                label="This page needs auth"
                            />
                            {authIsChecked && <Stack direction="row">
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='secondary'
                                    label="authUser"
                                    onChange={e => setAuthUser(e.target.value)}
                                    value={authUser}
                                    required
                                    sx={{ mb: 4 }}
                                    disabled={!authIsChecked}
                                />
                                <TextField
                                    type="text"
                                    variant='outlined'
                                    color='secondary'
                                    label="authPass"
                                    onChange={e => setAuthPass(e.target.value)}
                                    value={authPass}
                                    required
                                    disabled={!authIsChecked}
                                    sx={{ mb: 4 }}
                                />
                            </Stack>
                            }

                            <h3 style={{ marginBottom: 0 }}>Actions</h3>

                            <List dense={true}>
                                {generateList()}
                            </List>

                            <Button variant="contained" sx={{ mb: 4, display: 'block' }} onClick={newActionBtnHandler}>
                                Add new action
                                <PlusOneIcon />
                            </Button>
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
                    setActionIndex={setActionIndex}
                />
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

