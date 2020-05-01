const base = 'https://api.weather.gov'

function request(resource) {
    return fetch(`${base}${resource}`).then(r => r.json());
}

export async function getGridpoint(latitude, longitude) {
    // Go get the office / gridpoint from NWS
    const lat = parseFloat(latitude).toFixed(4),
          lon = parseFloat(longitude).toFixed(4);

    const gridPoint = await request(`/points/${lat},${lon}`)

    return {
        office: gridPoint.properties.cwa,
        gridX: gridPoint.properties.gridX,
        gridY: gridPoint.properties.gridY,
        zoneId: gridPoint.properties.county.split('/').slice(-1)[0]
    }
}

export async function getForecast(userLocation) {
    const {office, gridX, gridY} = userLocation;

    const cacheKey = `forecast/${office}/${gridX}/${gridY}`;
    const rawCached = sessionStorage.getItem(cacheKey);
    const cached = rawCached ? JSON.parse(rawCached) : null;
    if (cached && cached.expire > Date.now()) {
        return cached.value;
    }

    const resource = `/gridpoints/${office}/${gridX},${gridY}`;
    const [alerts, daily, hourly] = await Promise.all([
        fetchAlerts(userLocation),
        request(`${resource}/forecast`),
        request(`${resource}/forecast/hourly`)
    ]);

    const result = {
        key: `${office}/${gridX}/${gridY}`,
        alerts,
        daily: daily.properties.periods,
        hourly: hourly.properties.periods
    };

    // Store to cache
    const toCache = {
        expire: Date.now() + (30 * 60 * 1000),
        value: result
    };
    sessionStorage.setItem(cacheKey, JSON.stringify(toCache));

    return result;
}

async function fetchAlerts(userLocation) {
    if (!userLocation || !userLocation.zoneId) return [];

    const alerts = await request(`/alerts/active/zone/${userLocation.zoneId}`);

    return alerts.features;
}
