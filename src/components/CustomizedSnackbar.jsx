import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function CustomizedSnackbar({ open, severity, message }) {

    const [isOpen, setIsOpen] = React.useState(open);

    const handleClick = () => {
        setIsOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClick}>Open Snackbar</Button>
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
