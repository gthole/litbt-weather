import iconMap from './resources/icon-map';

export function groupBy(items, func) {
    return items.reduce((p, i) => {
        const k = func(i);
        if (!p[k]) p[k] = [];
        p[k].push(i);
        return p;
    }, {});
}

export function formatTime(t) {
    const d = new Date(t);
    let h = d.getHours() % 12;
    if (h === 0) h = 12;
    return `${h}${ d.getHours() >= 12 ? 'pm' : 'am' }`;
}

export function extractIcon(url) {
    const raw = url.split('/').slice(-1)[0];
    const [code, rawPercent] = raw.split('?')[0].split(',');
    const percent = rawPercent ? parseInt(rawPercent) : null;
    const resource = iconMap[code];
    return [resource, percent];
}
