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
