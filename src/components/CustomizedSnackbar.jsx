import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function CustomizedSnackbar({ open, severity, message }) {

    const [isOpen, setIsOpen] = React.useState(open);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };

    return (
        <div>
            <Snackbar 
            open={isOpen} 
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={6000} 
            onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
