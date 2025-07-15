import { IGps } from '../types/gps';

export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371e3; // meters
    const toRad = (deg: number) => deg * (Math.PI / 180);

    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);

    const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

export const findNearestGps = (gpsList: IGps[], currentGps: IGps) => {
    return gpsList.sort((a, b) => {
        const distanceA = haversineDistance(currentGps.lat, currentGps.lng, a?.lat || 0, a?.lng || 0);
        const distanceB = haversineDistance(currentGps.lat, currentGps.lng, b?.lat || 0, b?.lng || 0);

        return distanceA - distanceB;
    })[0];
};
