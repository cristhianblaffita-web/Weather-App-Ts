import { useEffect, useState } from "react";

export type Place = {
    id: number;
    name: string;
    country: string;
    country_code: string;
    latitude: number;
    longitude: number;
};

export type GeocodingResponse = {
    results: Place[];
    generation_time: number;
};


export function useGeocoding(city: string) {
    const [cities, setCities] = useState<GeocodingResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
    
                const data: GeocodingResponse = await response.json();

                setCities(data);
            } catch(err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [city]);

    return { cities, loading, error };
};