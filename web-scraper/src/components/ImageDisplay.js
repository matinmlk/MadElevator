import React from 'react';

function ImageDisplay({ images }) {
    if (images.length === 0) return null;

    const formatSize = (size) => {
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
        return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    };
    
    return (
        <>
            <div className="section-header">
                <h3>Images</h3>
            </div>
            <div className="content-grid images-grid">
                {images.map((image, index) => (
                    <div key={index} className="image-card">
                        <img 
                            src={image.url} 
                            alt={`Scraped content ${index + 1}`}
                        />
                        <div className="image-card-content">
                            <a 
                                href={image.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="image-card-link"
                            >
                                {image.url.length > 40 ? `${image.url.substring(0, 37)}...` : image.url}
                            </a>
                            <div className="image-card-details">
                                <span>{image.width}×{image.height}</span>
                                <span>{image.type}</span>
                                <span>{formatSize(image.size)}</span>
                            </div>
                            {image.metadata && (
                                <div className="image-card-metadata">
                                    {Object.entries(image.metadata).map(([key, value]) => (
                                        <div key={key}>
                                            <strong>{key}:</strong> {value}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ImageDisplay;
