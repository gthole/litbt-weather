import React from 'react';
import './style.css';

export function ErrorAlert({body, dismiss}) {
    if (!body) return '';
    return (
        <div className="ErrorAlert" onClick={ dismiss }>
            <span className="title">Error:</span>
            <div className="body">
                { body }
            </div>
        </div>
    );
}
