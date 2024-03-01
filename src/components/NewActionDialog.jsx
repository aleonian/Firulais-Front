import { React, Fragment, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Select, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/material';
import { ErrorSnackBar } from './ErrorSnackBar';

export const NewActionDialog = ({ open, handleClose, setActions, actions }) => {

    const [name, setName] = useState("");
    const [elementId, setElementId] = useState("");
    const [command, setCommand] = useState("");
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (event) => {

        event.preventDefault();

        if(actions.find(action=>action.name === name)){
            setErrorMessage("The action name must be unique!");
            setShowErrorAlert(true);
            return;
        }

        const newActions = [...actions];
        newActions.push({name, elementId, command});
        setActions(newActions);
        handleClose();
    }

    return (
        <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
            <DialogTitle>Create new action 🎬 for the 🦴 test for the 🐶</DialogTitle>
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
                                    defaultValue=""
                                    sx={{ mb: 4 }}
                                >
                                    <MenuItem key={1} value={"waitForSelector"}>waitForSelector</MenuItem>
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

