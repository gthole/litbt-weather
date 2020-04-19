import React from 'react';
import './style.css';

export function ErrorAlert(props) {
    if (!props.body) return '';
    return (
        <div className="ErrorAlert" onClick={ props.dismiss }>
            <span className="title">Error:</span>
            <div className="body">
                { props.body }
            </div>
        </div>
    );
}
