import React, { useState } from "react";
import ReactDOM from 'react-dom/client';
import { DetailsDialog } from './DetailsDialog'
// can't make it import this file, don't know what's wrong
import { ImageCover } from "./ImageCover";


export const Details = ({ data }) => {

    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    // const [imageDialogOpen, setImageDialogOpen] = useState(false);

    const openImageWindow = (imageUrl) => {
        const newWindow = window.open('', '_blank');
        if (newWindow) {
            newWindow.document.body.innerHTML = '<div id="root"></div>';
            // ReactDOM.render(<ImageCover imageUrl={imageUrl} />, newWindow.document.getElementById('root'));

            const link = newWindow.document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = "ImageCover.css";
        
            // Append the link element to the head of the new window's document
            newWindow.document.head.appendChild(link);

            ReactDOM.createRoot(newWindow.document.getElementById('root')).render(<ImageCover imageUrl={imageUrl} />);
        } else {
            console.error("Failed to open new window.");
        }
    };

    const showDetails = () => {
        if (data.name === "take-pic") {
            const fileName = data.value;
            const imageUrl = import.meta.env.VITE_APP_BACKEND + "/snapshots/" + fileName;
            openImageWindow(imageUrl);
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