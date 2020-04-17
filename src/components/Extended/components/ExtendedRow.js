import React, { useState } from 'react';
import { ForecastBar } from './ForecastBar';

export function ExtendedRow(props) {
    const [expanded, setExpanded] = useState(false);

    let expandedDetails = '';
    if (expanded) {
        expandedDetails = <div><p>{ props.day.detailedForecast }</p></div>;
    }

    return (
        <div className="ExtendedRow">
            <div onClick={ () => setExpanded(!expanded) }>
                <ForecastBar
                    day={props.day}
                    min={props.min}
                    max={props.max}
                ></ForecastBar>
            </div>
            { expandedDetails }
        </div>
    )
}
