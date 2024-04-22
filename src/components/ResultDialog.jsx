// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { Fragment, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { Box } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { DeleteConfirm } from './DeleteConfirm';
import { ErrorSnackBar } from './ErrorSnackBar';
import { SuccessSnackbar } from './SuccessSnackbar';
import { ProblemsDatatAble } from './ProblemsDatatAble';
import { Details } from './Details';

export const ResultDialog = ({ open, handleClose, results, resultIndex }) => {

    const [DeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [actions, setActions] = useState([]);
    const [actionIndex, setActionIndex] = useState(null);

    function generateActionsList() {
        if (resultIndex != null && results[resultIndex].actions) {
            const actions = Object.keys(results[resultIndex].actions);
            if (actions.length > 0) {
                return (
                    <div>
                        {
                            actions.map((action, index) => {
                                const desiredAction = results[resultIndex].actions[action];
                                return (
                                    <Accordion key={`${action}-${index}`} className='accordion'>
                                        <AccordionSummary
                                            expandIcon={<ArrowDownwardIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                            // sx={{ backgroundColor: 'red' }}
                                            className="accordion-summary-background"
                                        >
                                            <Box>
                                                <Typography>{action}</Typography>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <List>
                                                {
                                                    desiredAction.commandLogs.map((commandLog, index) => {
                                                        return (
                                                            <ListItem key={`${commandLog.command}-${index}`}>
                                                                <ListItemText primary={`${commandLog.success ? '✅' : '❌'} ${commandLog.command}`} />
                                                                {commandLog.data ? <Details data={commandLog.data} /> : ""}
                                                            </ListItem>
                                                        )
                                                    })
                                                }
                                            </List>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })
                        }
                    </div>
                )
            }
        }

        // Return a default value if conditions are not met
        return null;
    }


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
    const resultComment = () => {
        return `${results[resultIndex].stats.successfullCommands} ✅\
        ${results[resultIndex].stats.failedCommands} ❌`
    }

    return (
        <Dialog fullWidth={true} maxWidth="md" open={open} onClose={() => {
            handleClose();
            // setTimeout(() => cleanUp(), 1000);
        }}>
            <DialogTitle>Result details</DialogTitle>
            <DialogContent>
                <Fragment>
                    <Box sx={{ minWidth: 120 }}>
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="testName"
                                    label="Name"
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
                                    label="When"
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
                                    value={resultIndex != null && `${resultComment()}  ===>   ${results[resultIndex].success ? "👍" : "👎"}`}
                                    name="result"
                                    label="Outcome"

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="url"
                                    value={resultIndex != null && results[resultIndex].url}
                                    id="url"
                                    label="url"
                                />
                            </Grid>

                            {
                                resultIndex != null && results[resultIndex].problems &&
                                <Grid item xs={12}>
                                    <ProblemsDatatAble
                                        rows={
                                            results[resultIndex].problems
                                                .map((problem, index) => {
                                                    return { ...problem, id: `${problem.errorMessage} - ${index}` }
                                                })
                                        } />
                                </Grid>
                            }

                            <Grid item xs={12} sm={6}>
                                Actions:
                                {generateActionsList()}
                            </Grid>

                        </Grid>
                    </Box>
                </Fragment>
            </DialogContent>
{/* 
            {showErrorAlert && <ErrorSnackBar open={true} message={errorMessage} />}
            {showSuccessAlert && <SuccessSnackbar open={true} message={successMessage} />} */}
            <DeleteConfirm
                open={DeleteConfirmOpen}
                handleClose={() => { setDeleteConfirmOpen(false) }}
                handleYesCase={deleteAction}
            />

        </Dialog >
    );
};

