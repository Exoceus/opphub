import React, { useState, useEffect } from 'react';

function ImageUploader({setImage, type}) {
    return(
        <div className="image-card">
            <div className="image-card-header">
                <label>{type} Image </label>

            </div>
            <div className="image-card-body">
                <p className="card-text">Please upload an image for the {type.toLowerCase()}. {type==='Opportunity' ? "We recommend the organization's logo." : null }</p>
                <p className="card-text">Please upload a SQUARE image (1:1 aspect ratio) that is atleast 200px * 200px</p>
                <input type="file" className="form-control" onChange={e => setImage(e.target.files[0])} />
            </div>
        </div>
    )
}

export default ImageUploader
