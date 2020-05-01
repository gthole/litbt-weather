import React from 'react';
import { Timeline } from '../../../../common/Timeline';
import './style.css';

export function ExtendedDetails({day}) {
    return (
        <div className="ExtendedDetails">
            <div className="summary">
                <strong>{ day.shortForecast }</strong>
            </div>
            <div className="description">
                { day.detailedForecast }
            </div>
            <Timeline hours={ day.hours } />
        </div>
    );
}
