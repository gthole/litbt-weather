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

    const hourStart = Date.now() - (Date.now() % (60 * 60 * 1000));
    const next24 = forecast.hourly
        .filter(h => new Date(h.startTime).valueOf() >= hourStart)
        .slice(0, 24);

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
            <Timeline hours={ next24 } />
        </div>
    );
}
