import React from 'react';
import './style.css'
import iconMap from './icon-map';

function adjustForPercent(icon, percent, daytime) {
    if (!percent) return icon;
    percent = parseInt(percent);

    if (icon === 'sprinkle' && percent <= 50) {
        return daytime ? 'day-sprinkle' : 'night-sprinkle';
    }
    return icon;
}

export function Icon(props) {
    if (!props.icon) return '';

    const iconResource = props.icon.split('/').slice(-1)[0];
    const [code, percent] = iconResource.split('?')[0].split(',');
    const wicon = iconMap[code] || 'na';
    const adjusted = adjustForPercent(wicon, percent, props.daytime);

    return (<i className={'purple wi wi-' + adjusted} data-icon={iconResource}></i>)
}
