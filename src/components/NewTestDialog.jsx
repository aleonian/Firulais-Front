import { Dialog, DialogTitle, DialogContent } from '@mui/material';

export const NewTestDialog = ({ open, handleClose }) => {

    return (
        <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
            <DialogTitle>Create New Test for the doggy</DialogTitle>
            <DialogContent>
            </DialogContent>
        </Dialog>
    );
};

