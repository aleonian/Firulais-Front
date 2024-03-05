// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { CustomizedSnackbar } from './CustomizedSnackbar'

export function SuccessSnackbar({ open, message }) {

    return (
        <CustomizedSnackbar open={open} message={message} severity={"success"} />
    );
}
