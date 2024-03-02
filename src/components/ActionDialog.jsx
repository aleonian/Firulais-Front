import { React, Fragment, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Select, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/material';
import { ErrorSnackBar } from './ErrorSnackBar';

export const ActionDialog = ({ open, handleClose, setActions, actions, actionIndex }) => {

    const [name, setName] = useState("");
    const [elementId, setElementId] = useState("");
    const [command, setCommand] = useState("");
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event) => {

        event.preventDefault();

        //if !actionIndex means if this is a new action
        //if the action is not new, if it's being edited, then actionIndex will not be falsy
        if (actionIndex === null) {
            if (actions.find(action => action.name === name)) {
                setErrorMessage("The action name must be unique!");
                setShowErrorAlert(true);
                return;
            }
            else {
                const newActions = [...actions];
                newActions.push({ name, elementId, command });
                setActions(newActions);
            }
        }
        else {
            const newActions = [...actions];
            newActions[actionIndex] = { name, elementId, command };
            setActions(newActions);
        }
        handleClose();
    }

    return (
        <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
            <DialogTitle>Create new action 🎬 for the test 🦴 for Firulais 🐶</DialogTitle>
            <DialogContent>
                <Fragment>
                    <Box sx={{ minWidth: 120 }}>
                        <form onSubmit={handleSubmit} id="newActionForm">
                            {/* <form onSubmit={handleSubmit} action={<Link to="/login" />}> */}
                            {/* <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                        </Stack> */}
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Name"
                                onChange={e => setName(e.target.value)}
                                // value={email}
                                fullWidth
                                required
                                value={actionIndex ? actions[actionIndex].name : name}
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Element Id"
                                onChange={e => setElementId(e.target.value)}
                                // value={password}
                                required
                                fullWidth
                                value={actionIndex ? actions[actionIndex].elementId : elementId}
                                sx={{ mb: 4 }}
                            />

                            <FormControl fullWidth>
                                <InputLabel id="selectActionLabel">Select an Action</InputLabel>
                                <Select
                                    labelId="selectActionLabel"
                                    // value={personName}
                                    label="Select an Action"
                                    onChange={e => setCommand(e.target.value)}
                                    required
                                    // defaultValue=""
                                    value={actionIndex ? actions[actionIndex].command : command}
                                    sx={{ mb: 4 }}
                                >
                                    <MenuItem key={1} value={"waitForSelector"}>waitForSelector</MenuItem>
                                    <MenuItem key={2} value={"otraVaina"}>otraVaina</MenuItem>
                                </Select>
                            </FormControl>
                            {/* <Button variant="contained" sx={{ mb: 4 }} onClick={newActionBtnHandler}>
                                Add new action
                                <PlusOneIcon />
                            </Button> */}
                            <Button variant="outlined" color="secondary" type="submit">Save</Button>
                        </form>
                    </Box>
                    {showErrorAlert && <ErrorSnackBar open={true} message={errorMessage} />}
                </Fragment>
            </DialogContent>
        </Dialog>
    );
};

