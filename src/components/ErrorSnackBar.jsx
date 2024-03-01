import * as React from 'react';
import { CustomizedSnackbar } from './CustomizedSnackbar'

export function ErrorSnackBar({ open, message }) {

    return (
        <CustomizedSnackbar open={open} message={message} severity={"error"} />
    );
}
