import { React, Fragment, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Select, FormControl, InputLabel, MenuItem, TextField } from '@mui/material';
import { Box } from '@mui/material';

export const NewTestDialog = ({ open, handleClose }) => {

    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      
    return (
        <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
            <DialogTitle>Create New Test 🦴 for the doggy</DialogTitle>
            <DialogContent>
                <Fragment>
                    <Box sx={{ minWidth: 120 }}>
                        <form>
                            {/* <form onSubmit={handleSubmit} action={<Link to="/login" />}> */}
                            {/* <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="First Name"
                                // onChange={e => setFirstName(e.target.value)}
                                // value={firstName}
                                fullWidth
                                required
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Last Name"
                                // onChange={e => setLastName(e.target.value)}
                                // value={lastName}
                                fullWidth
                                required
                            />
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

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select an Action</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={personName}
                                    label="Select an Action"
                                    onChange={handleChange}
                                    required
                                    multiple
                                    sx={{ mb: 4 }}
                                >
                                    <MenuItem key={10} value={10}>Ten</MenuItem>
                                    <MenuItem key={20} value={20}>Twenty</MenuItem>
                                    <MenuItem key={30} value={30}>Thirty</MenuItem>

                                </Select>
                            </FormControl>
                            <Button variant="outlined" color="secondary" type="submit">Register</Button>
                        </form>
                    </Box>
                </Fragment>
            </DialogContent>
        </Dialog>
    );
};

