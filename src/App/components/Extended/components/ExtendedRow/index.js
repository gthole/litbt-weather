import React, { useState } from 'react';
import './style.css';
import { CSSTransition } from 'react-transition-group';
import { ForecastBar } from '../ForecastBar';
import { ExtendedDetails } from '../ExtendedDetails';

export function ExtendedRow({day, min, max}) {
    const [expanded, setExpanded] = useState(false);
    if (day.hours.length < 24) return '';

    return (
        <div className="ExtendedRow">
            <div className="forecast" onClick={ () => setExpanded(!expanded) }>
                <ForecastBar
                    day={day}
                    min={min}
                    max={max}
                ></ForecastBar>
            </div>
            <CSSTransition
                    in={expanded}
                    timeout={400}
                    classNames='openSection'
                    unmountOnExit>
                <ExtendedDetails day={ day } />
            </CSSTransition>
        </div>
    )
}
