import React from 'react';
import './style.css';
import { Icon } from '../../common/Icon';
import { Timeline } from '../../common/Timeline';

export function Current({forecast}) {
    if (!forecast) return '';

    const today = forecast.daily[0];
    const current = forecast.hourly[0];
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
            <Timeline hours={ forecast.hourly.slice(0, 24) } />
        </div>
    );
}
