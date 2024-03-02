import * as React from 'react';
import { Fragment, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Select, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
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

export const TestDialog = ({ open, handleClose, tests, setTests, testIndex }) => {

    const [ActionDialogOpen, setActionDialogOpen] = useState(false);
    const [DeleteActionConfirmOpen, setDeleteActionConfirmOpen] = useState(false);
    const [actions, setActions] = useState([]);
    const [actionIndex, setActionIndex] = useState(null);
    const [name, setName] = useState([]);
    const [url, setUrl] = useState([]);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
        setName(null);
        setUrl(null);
    }
    const handleSaveBtn = (event) => {

        event.preventDefault();

        if (testIndex === null) {
            if (tests.find(test => test.name === name)) {
                setErrorMessage("The test name must be unique!");
                setShowErrorAlert(true);
                return;
            }
            const newTests = [...tests];
            newTests.push({ name, url, actions });
            setTests(newTests);
            // handleClose();
        }
        else {
            const newTests = [...tests];
            newTests[testIndex] = { name, url, actions };
            setTests(newTests);
        }

        cleanUp();
        handleClose();
    }

    return (
        <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
            <DialogTitle>Create New Test 🦴 for the doggy</DialogTitle>
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
                                value={testIndex ? tests[testIndex].name : name}
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
                                value={testIndex ? tests[testIndex].url : url}
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
            <DeleteActionConfirm
                open={DeleteActionConfirmOpen}
                handleClose={() => { setDeleteActionConfirmOpen(false) }}
                handleYesCase={deleteAction}
            />

        </Dialog>
    );
};

