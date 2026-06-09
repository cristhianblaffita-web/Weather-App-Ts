export function getCloudCoverage(cloudCover: number) {
    if (cloudCover <= 20) return 'Clear';
    if (cloudCover <= 50) return 'Partly Cloudy';
    if (cloudCover <= 80) return 'Mostly Cloudy';
    return 'Overcast';
}