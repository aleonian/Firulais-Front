import * as React from 'react';
import { DraggableDialog } from './DraggableDialog'

export function DeleteConfirm({ open, handleClose, handleYesCase }) {

    return (
        <DraggableDialog 
        open={open} 
        handleClose={handleClose} 
        handleYesCase={handleYesCase} 
        title="Are you sure?" message="Do you really want to delete it?" />
    );
}
