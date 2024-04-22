import React, { useState } from "react";
import { DetailsDialog } from './DetailsDialog'


export const Details = ({ data }) => {

    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);

    const openImageWindowSimpler = (imageUrl) => {
        const newWindow = window.open(imageUrl, '_blank');
        if (newWindow) {
        } else {
            console.error("Failed to open new window.");
        }
    };

    const showDetails = () => {
        if (data.name === "take-pic") {
            const fileName = data.value;
            const imageUrl = import.meta.env.VITE_APP_BACKEND + "/snapshots/" + fileName;
            openImageWindowSimpler(imageUrl);
        }
        else if (data.name === "generate-lighthouse-report") {
            const fileName = data.value;
            const imageUrl = import.meta.env.VITE_APP_BACKEND + "/reports/" + fileName;
            openImageWindowSimpler(imageUrl);
        }
        else setDetailsDialogOpen(true);
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