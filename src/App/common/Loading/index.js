import React from 'react';
import './style.css';

export function Loading({show}) {
    if (!show) return '';
    return (
        <div className="Loading">
            <div className="loading-icon">
                <div className="cloud"></div>
                <div className="sun">
                    <div className="rays"></div>
                </div>
                <div className="rain"></div>
            </div>
        </div>
    );
}
