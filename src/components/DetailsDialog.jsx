import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export function DetailsDialog({ open, handleClose, title, data }) {
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {data.name === "check-image-tags" && data.value.map(imgObj => {
                            return (
                                <>
                                    <div>
                                        <b>Img src:</b>
                                        {imgObj.src}
                                    </div>
                                    <div>
                                        {imgObj.alt && <b>Img Alt:</b>}
                                        {imgObj.alt &&
                                            imgObj.alt.length > 0 ?
                                            imgObj.alt + " ✅"
                                            : "NO ALT ❌"}
                                    </div>
                                    <hr />
                                </>
                            )
                        })}
                        {data.name === "compare-equal" &&
                            <>
                                <div>
                                    <b>firstOperand:</b>
                                    {data.value.firstOperand}
                                </div>
                                <div>
                                    <b>secondOperand:</b>
                                    {data.value.secondOperand}
                                </div>
                                <hr />
                            </>
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
