import React from 'react';
import './style.css';
import { Icon } from '../../../../common/Icon';

function RangeBlock({day, max, min}) {
    function width(lower, upper) {
        return (100 * (upper - lower) / (max - min)) + '%';
    }

    return (
        <div className="RangeBlock">
            <div style={{width: width(min, day.minTemp)}}>&nbsp;</div>
            <div className="range-bar" style={{width: width(day.minTemp, day.maxTemp)}}>
                <span className="range-bar-prefix">{ day.minTemp }°</span>
                <span className="range-bar-suffix">{ day.maxTemp }°</span>
            </div>
            <div style={{width: width(day.maxTemp, max)}}>&nbsp;</div>
        </div>
    )
}

export function ForecastBar({day, max, min}) {
    const start = new Date(day.startTime);
    const dayName = start.valueOf() < Date.now() ? 'Today' :
        start.toLocaleString('en-US', {weekday: 'short'});

    return (
        <div className="ForecastBar">
            <div className="forecast-icon">
                <Icon icon={ day.icon } daytime={ true }></Icon>
            </div>
            <div className="day-name">
                { dayName }
            </div>
            <RangeBlock day={day} max={max} min={min}/>
            <div className="endcap">&nbsp;</div>
        </div>
    )
}
