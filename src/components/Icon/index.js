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

export function Icon(props) {
    if (!props.icon) return '';

    const [resource, percent] = extractIcon(props.icon);
    if (!resource) return <i className={'purple wi wi-na'}></i>;

    const wicon = resource.icon[props.daytime ? 'day' : 'night'];
    const adjusted = adjustForPercent(wicon, percent, props.daytime);

    return (<i className={'purple wi wi-' + adjusted}></i>)
}
