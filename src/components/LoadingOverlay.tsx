import React from 'react';

// @ts-ignore
const LoadingOverlay = ({ isLoading }) => {
    if (!isLoading) {
        return null;
    }

    return (
        <div className="loading-overlay">
            <div className="spinner"></div>
        </div>
    );
};

export default LoadingOverlay;
