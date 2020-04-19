import React, { useState } from 'react';
import { ForecastBar } from './ForecastBar';
import { ExtendedDetails } from './ExtendedDetails';

export function ExtendedRow(props) {
    const [expanded, setExpanded] = useState(false);

    let details = '';
    if (expanded) {
        details = <ExtendedDetails day={ props.day } />;
    }

    return (
        <div className="ExtendedRow">
            <div className="forecast" onClick={ () => setExpanded(!expanded) }>
                <ForecastBar
                    day={props.day}
                    min={props.min}
                    max={props.max}
                ></ForecastBar>
            </div>
            { details }
        </div>
    )
}
