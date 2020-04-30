import React from 'react';
import './style.css'
import { extractIcon } from '../../utility';

function adjustForPercent(icon, percent, daytime) {
    if (!percent) return icon;

    if (icon.endsWith('showers') && percent <= 50) {
        return daytime ? 'day-sprinkle' : 'night-sprinkle';
    }
    return icon;
}

export function Icon({icon, daytime}) {
    if (!icon) return '';

    const [resource, percent] = extractIcon(icon);
    if (!resource) return <i className={'purple wi wi-na'}></i>;

    const wicon = resource.icon[daytime ? 'day' : 'night'];
    const adjusted = adjustForPercent(wicon, percent, daytime);

    return (<i className={'purple wi wi-' + adjusted}></i>)
}
