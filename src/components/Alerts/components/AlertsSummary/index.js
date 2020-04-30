import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import './style.css';

export function AlertsSummary({alerts, setShowModal}) {
    let msg;
    if (alerts.length > 1) {
        msg = `${alerts.length} Alerts`;
    } else {
        msg = alerts[0].properties.event;
    }
    return (
        <div className="AlertsSummary">
            <div className="alert-button" onClick={ () => setShowModal(true) }>
                <FontAwesomeIcon icon={faExclamationTriangle} className="alert-icon"/>
                { msg }
            </div>
        </div>
    );
}
