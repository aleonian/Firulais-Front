import React from "react";

export function ImageCover({ imageUrl }) {
    return (
        <div className="image-cover" style={{
            backgroundImage: `url(${imageUrl})`
        }}>
        </div>
    );
}

// backgroundImage: `url(${imageUrl})`,
// width: "100vw", /* Set width to cover the entire viewport */
// height: "100vh", /* Set height to cover the entire viewport */
// backgroundSize: "cover", /* Cover the container with the background image */
// backgroundPosition: "center", /* Center the background image */
// overflow: "hidden" /* Hide any overflow beyond the viewport */