const base = 'https://api.weather.gov'

async function request(resource, attempts = 0) {
    if (attempts > 0) {
        await new Promise(r => setTimeout(r, 100 * (attempts + 1)));
    }

    try {
        const response = await fetch(`${base}${resource}`)
        if (response.status >= 400) {
            throw response;
        }
        return response.json();
    } catch (err) {
        // Try a couple times before giving up, since we often get
        // 500 errors from the NWS
        if (err.status && err.status >= 500 && attempts < 7) {
            return request(resource, attempts + 1);
        }
        throw err;
    }
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
