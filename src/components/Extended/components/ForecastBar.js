import React from 'react';
import { Icon } from '../../Icon';

export function ForecastBar(props) {
    function range(num) {
        return Math.round((num - props.min) * 100 / props.max);
    }

    function width(lower, upper) {
        return (range(upper) - range(lower)) + '%';
    }

    const dayName =  new Date(props.day.startTime)
        .toLocaleString('en-US', {weekday: 'short'}) ;

    return (
        <div className="row">
            <div>
                <Icon icon={ props.day.icon } daytime={ true }></Icon>
            </div>
            <div>
                { dayName }
            </div>
            <div style={{width: width(props.min, props.day.minTemp)}}>&nbsp;</div>
            <div className="bar">
                <span className="bar-prefix">{ props.day.minTemp }°</span>
                <span className="bar-suffix">{ props.day.maxTemp }°</span>
            </div>
            <div style={{width: width(props.day.maxTemp, props.max)}}>&nbsp;</div>
            <div style={{width: '42px'}}>&nbsp;</div>
        </div>
    )
}
