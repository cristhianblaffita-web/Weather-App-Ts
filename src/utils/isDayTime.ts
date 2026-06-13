export function isDayTime(
    currentDate: string,
    sunriseList: string[],
    sunsetList: string[]
) {

    const dateIndex = sunriseList.findIndex(
        date => date.slice(0, 10) === currentDate.slice(0, 10)
    );

    if (dateIndex === -1) return false;

    const currentHour = currentDate.slice(11, 16);
    const sunriseHour = sunriseList[dateIndex].slice(11, 16);
    const sunsetHour = sunsetList[dateIndex].slice(11, 16);

    return (
        currentHour >= sunriseHour &&
        currentHour < sunsetHour
    );
}