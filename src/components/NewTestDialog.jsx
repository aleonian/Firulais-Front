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

import { NewActionDialog } from './NewActionDialog';

export const NewTestDialog = ({ open, handleClose }) => {

    const [newActionDialogOpen, setNewActionDialogOpen] = useState(false);
    const [actions, setActions] = useState([]);

    const newActionBtnHandler = () => {
        setNewActionDialogOpen(true);
    }

    function generate() {
        if (actions.length > 0) {
            debugger;
            return (
                <List>
                    {
                        actions.map(action => {
                            return (
                                <>
                                    <ListItem key={action.name} secondaryAction={
                                        <>
                                            <IconButton onClick={handleActionEdit} edge="end" aria-label="edit">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={handleActionDelete} edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    }
                                    >
                                        <ListItemText primary={action.name} />
                                    </ListItem>
                                </>
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

    const handleActionEdit = () => {
        debugger;
    }

    const handleActionDelete = () => {
        debugger;
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
                                // onChange={e => setEmail(e.target.value)}
                                // value={email}
                                fullWidth
                                required
                                sx={{ mb: 4 }}
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Url"
                                // onChange={e => setPassword(e.target.value)}
                                // value={password}
                                required
                                fullWidth
                                sx={{ mb: 4 }}
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
                                {generate(

                                )}
                            </List>

                            <Button variant="contained" sx={{ mb: 4, display: 'block' }} onClick={newActionBtnHandler}>
                                Add new action
                                <PlusOneIcon />
                            </Button>

                            <Button variant="outlined" color="secondary" type="submit">Register</Button>
                        </form>
                    </Box>
                </Fragment>
                <NewActionDialog
                    open={newActionDialogOpen}
                    handleClose={() => {
                        setNewActionDialogOpen(false);
                    }}
                    setActions={setActions}
                    actions={actions}
                />
            </DialogContent>
        </Dialog>
    );
};

