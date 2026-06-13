export function WeatherLoading() {
    return (
        <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-full max-w-2xl bg-card-elevated/30 flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/40 p-6 shadow-sm">
                <div className="h-10 w-10 rounded-full border-4 border-accent/30 border-t-accent animate-spin" />

                <span className="text-text-secondary text-sm font-medium">
                    Loading weather...
                </span>
            </div>
        </div>
    );
}


export function WeatherError({
    message = "Unable to load weather data"
}: {
    message?: string;
}) {
    return (
        <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-full max-w-2xl bg-card-elevated/30 flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/40 p-6 shadow-sm">

                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent/10 text-accent text-xl">
                    !
                </div>

                <h3 className="text-text-primary font-semibold">
                    Weather unavailable
                </h3>

                <p className="text-text-secondary text-sm text-center">
                    {message}
                </p>

            </div>
        </div>
    );
}