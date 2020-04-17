export function groupBy(items, func) {
    return items.reduce((p, i) => {
        const k = func(i);
        if (!p[k]) p[k] = [];
        p[k].push(i);
        return p;
    }, {});
}
