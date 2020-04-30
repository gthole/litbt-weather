import React from 'react';
import './style.css';
import { Icon } from '../../../Icon';

export function ForecastBar({day, max, min}) {
    function range(num) {
        return Math.round((num - min) * 100 / max);
    }

    function width(lower, upper) {
        return (range(upper) - range(lower)) + '%';
    }

    const start = new Date(day.startTime);
    const dayName = start.valueOf() < Date.now() ? 'Today' :
        start.toLocaleString('en-US', {weekday: 'short'}) ;

    return (
        <div className="ForecastBar">
            <div className="forecast-icon">
                <Icon icon={ day.icon } daytime={ true }></Icon>
            </div>
            <div className="day-name">
                { dayName }
            </div>
            <div style={{width: width(min, day.minTemp)}}>&nbsp;</div>
            <div className="range-bar">
                <span className="range-bar-prefix">{ day.minTemp }°</span>
                <span className="range-bar-suffix">{ day.maxTemp }°</span>
            </div>
            <div style={{width: width(day.maxTemp, max)}}>&nbsp;</div>
            <div className="endcap">&nbsp;</div>
        </div>
    )
}
