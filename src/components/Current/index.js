import React from 'react';
import './style.css';
import { Icon } from '../Icon';
import { Timeline } from '../Timeline';

export function Current(props) {
    if (!props.forecast) return '';

    const today = props.forecast.daily[0];
    const current = props.forecast.hourly[0];
    if (!current) return '';

    const detailed = today.detailedForecast.split('. ').map((s, i) => (
        s + (s.endsWith('.') ? '' : '.')
    ));

    return (
        <div className="Current">
            <div className="summary">
                <Icon icon={ current.icon } daytime={ current.isDaytime }></Icon>
                <span className="summary-text">
                    { current.temperature }° { current.shortForecast }
                </span>
            </div>
            <div className="detailedForecast">
                { detailed.map((s, i) => (<p key={ 'forecast-' + i }>{ s }</p>)) }
            </div>
            <Timeline hours={ props.forecast.hourly.slice(0, 23) } />
        </div>
    );
}
