export function formatDate(
    isoDate: string
) {
    const [date, time] = isoDate.split("T");

    return {
        fullDate: `${date} ${time?.slice(0,5)}`,
        dateOnly: new Date(date).toDateString(),
        hourOnly: time?.slice(0,5)
    };
}