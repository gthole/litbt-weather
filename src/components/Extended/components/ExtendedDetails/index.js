import React from 'react';
import { Timeline } from '../../../Timeline';
import './style.css';

export function ExtendedDetails(props) {
    return (
        <div className="ExtendedDetails">
            <div className="summary">
                <strong>{ props.day.shortForecast }</strong>
            </div>
            <div className="description">
                { props.day.detailedForecast }
            </div>
            <Timeline hours={ props.day.hours } />
        </div>
    );
}
