import React, { useState } from 'react';
import './style.css';
import { CSSTransition } from 'react-transition-group';
import { ForecastBar } from '../ForecastBar';
import { ExtendedDetails } from '../ExtendedDetails';

export function ExtendedRow(props) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="ExtendedRow">
            <div className="forecast" onClick={ () => setExpanded(!expanded) }>
                <ForecastBar
                    day={props.day}
                    min={props.min}
                    max={props.max}
                ></ForecastBar>
            </div>
            <CSSTransition
                    in={expanded}
                    timeout={400}
                    classNames='openSection'
                    unmountOnExit>
                <ExtendedDetails day={ props.day } />
            </CSSTransition>
        </div>
    )
}
