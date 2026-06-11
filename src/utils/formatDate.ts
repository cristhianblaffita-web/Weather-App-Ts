export function formatDate(isoDate: string, timezone: string) {
    const date = new Date(isoDate);

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        dateStyle: 'medium',
    });

    const timeFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        timeStyle: 'short',
    });

    const fullDate = `${dateFormatter.format(date)} ${timeFormatter.format(date)}`;

    return {
        fullDate,
        dateOnly: dateFormatter.format(date),
        hourOnly: timeFormatter.format(date),
    };
}