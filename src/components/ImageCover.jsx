import React from "react";

export function ImageCover({ imageUrl }) {
    return (
        <div className="image-cover" style={{
            backgroundImage: `url(${imageUrl})`
        }}>
        </div>
    );
}