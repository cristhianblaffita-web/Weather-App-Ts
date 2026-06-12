export function formatDate(
    isoDate: string
) {
    const [date, time] = isoDate.split("T");

    const formattedDate = new Date(date);

    const fullDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(formattedDate);

    const shortDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    }).format(formattedDate);

    return {
        fullDate,
        shortDate,
        hourOnly: time?.slice(0,5)
    };
}