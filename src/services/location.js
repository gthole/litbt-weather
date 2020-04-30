import { getGridpoint } from './nws';

const base = 'https://nominatim.openstreetmap.org';

async function coordsToLocation(latitude, longitude) {
    const [gridpointRes, display] = await Promise.all([
        getGridpoint(latitude, longitude),
        reverseName(latitude, longitude)
    ]);

    const {zoneId, office, gridX, gridY} = gridpointRes;

    return {
        key: `${office}/${gridX}/${gridY}`,
        latitude,
        longitude,
        display,
        office,
        gridX,
        gridY,
        zoneId
    };
}

async function reverseName(lat, lon) {
    const data = await fetch(`${base}/reverse?lat=${lat}&lon=${lon}&format=json`)
            .then(r => r.json());

    const addr = data.address;
    const city = addr.village || addr.town || addr.city;
    const region = addr.postcode ? `${addr.state} ${addr.postcode}` : addr.state;
    if (addr.neighbourhood && city) {
        return `${addr.neighbourhood}, ${city}, ${region}`;
    }
    if (city) {
        return `${city}, ${region}`;
    }
    if (addr.neighbourhood) {
        return `${addr.neighbourhood}, ${region}`;
    }
    return region;
}

export async function locationSearch(input) {
    const data = await fetch(`${base}/search?q=${input}&countrycodes=US&format=json`)
            .then(r => r.json());

    // Pick the most relevant result
    const result = data[0];
    if (!result) throw new Error('No results found');

    return coordsToLocation(result.lat, result.lon);
}

export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            async (res) => {
                const loc = await coordsToLocation(
                    res.coords.latitude,
                    res.coords.longitude
                );
                return resolve(loc);
            },
            (err) => reject()
        );
    });
}
