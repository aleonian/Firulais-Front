// eslint-disable-next-line no-unused-vars
import { React, Fragment, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, FormControl, TextField } from '@mui/material';
import { Box } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import { ErrorSnackBar } from './ErrorSnackBar';

export const ActionDialog = ({ open, handleClose, setActions, actions, setActionIndex, actionIndex }) => {

    const [name, setName] = useState("");
    const [commands, setCommands] = useState("");
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // useEffect(() => {
    //     if (actionIndex !== null) {
    //         
    //         setName(actions[actionIndex].name);
    //         setCommands(actions[actionIndex].commands);
    //     }
    // }, [actionIndex]);

    const cleanUp = () => {
        // 
        // document.getElementById('actionName').value = "";
        // document.getElementById('actionCommands').value = "";
        setActionIndex(null);
    }

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
                newActions.push({ name, commands });
                setActions(newActions);
            }
        }
        else {
            const newActions = [...actions];
            newActions[actionIndex] = { name, commands };
            setActions(newActions);
        }
        cleanUp();
        handleClose();
    }

    return (
        <Dialog fullWidth={true} maxWidth="md" open={open} onClose={() => {
            cleanUp();
            handleClose();
        }}>
            <DialogTitle>{actionIndex != null ? "Edit" : "Create New"} action 🎬 for the test 🦴 for Firulais 🐶</DialogTitle>
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
                                fullWidth
                                required
                                value={actionIndex != null ? actions[actionIndex].name : name}
                                sx={{ mb: 4 }}
                            />
                            <FormControl fullWidth>
                                <Textarea
                                    color="neutral"
                                    placeholder="Write the action"
                                    minRows={2}
                                    maxRows={4}
                                    size="lg"
                                    variant="soft"
                                    id="actionCommands"
                                    onChange={e => setCommands(e.target.value)}
                                    sx={{ mb: 4 }}
                                    value={actionIndex != null ? actions[actionIndex].commands : commands}
                                />
                                {/* <Select
                                    labelId="selectActionLabel"
                                    // value={personName}
                                    label="Select a Command"
                                    onChange={e => setCommands(e.target.value)}
                                    required
                                    value={commands}
                                    sx={{ mb: 4 }}
                                >
                                    <MenuItem key={1} value={"waitForSelector"}>waitForSelector</MenuItem>
                                    <MenuItem key={2} value={"otraVaina"}>otraVaina</MenuItem>
                                </Select> */}
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

