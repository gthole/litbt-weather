import React from 'react';
import './style.css'
import { groupBy } from '../../utility';
import { ExtendedRow } from './components/ExtendedRow';

function findRange(hourly) {
    return hourly.reduce(([min, max], h) => {
        if (min === null || h.temperature < min) min = h.temperature;
        if (max === null || h.temperature > max) max = h.temperature;
        return [min, max];
    }, [null, null]);
}

export function Extended(props) {
    if (!props.forecast) return '';
    const daytimes = props.forecast.daily.filter(d => d.isDaytime);

    const [min, max] = findRange(props.forecast.hourly);

    const hourlyByDay = groupBy(props.forecast.hourly, (h) => h.startTime.split('T')[0]);
    daytimes.forEach(d => {
        const dayKey = d.startTime.split('T')[0];
        const dayHourly = hourlyByDay[dayKey];
        const [dayMin, dayMax] = findRange(dayHourly);
        d.minTemp = dayMin;
        d.maxTemp = dayMax;
    });

    return (
        <div className="Extended">
            {daytimes.map((d, i) => <ExtendedRow key={i} day={d} min={min} max={max} />)}
        </div>
    );
}
