import React from 'react';
import './style.css'
import { groupBy } from '../../../utility';
import { ExtendedRow } from './components/ExtendedRow';

function findRange(hourly) {
    return hourly.reduce(([min, max], h) => {
        if (min === null || h.temperature < min) min = h.temperature;
        if (max === null || h.temperature > max) max = h.temperature;
        return [min, max];
    }, [null, null]);
}

export function Extended({forecast}) {
    if (!forecast) return '';
    const daytimes = forecast.daily.filter((d, i) => i !== 0 && d.isDaytime);

    // Get the max/min temp for the extended forecast days
    const today = forecast.hourly[0].startTime.split('T')[0];
    const hours = forecast.hourly.filter(h => h.startTime.split('T')[0] !== today);
    const [min, max] = findRange(hours);

    const hourlyByDay = groupBy(hours, (h) => h.startTime.split('T')[0]);
    daytimes.forEach(d => {
        const dayKey = d.startTime.split('T')[0];
        const dayHourly = hourlyByDay[dayKey];
        const [dayMin, dayMax] = findRange(dayHourly);
        d.minTemp = dayMin;
        d.maxTemp = dayMax;
        d.hours = dayHourly;
    });

    return (
        <div className="Extended">
            <div className="section-title">Extended Forecast</div>
            {daytimes.map((d, i) => <ExtendedRow key={i} day={d} min={min} max={max} />)}
        </div>
    );
}
