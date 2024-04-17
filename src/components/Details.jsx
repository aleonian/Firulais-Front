import React, { useState } from "react";
import { DetailsDialog } from './DetailsDialog'


export const Details = ({ data }) => {

    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

    const showDetails = () => {
        setDetailsDialogOpen(true);
    }

    return (
        <>
            <a href="#" onClick={showDetails}>(Details)</a>

            <DetailsDialog
                open={detailsDialogOpen}
                handleClose={() => {
                    setDetailsDialogOpen(false);
                }}
                title="Details"
                data={data}
            />
        </>
    )

}