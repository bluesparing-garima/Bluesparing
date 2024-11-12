import { useState, useEffect } from "react";

interface LocationData {
  formatted_address: string;
  latitude: number;
  longitude: number;
}

interface GeocodeResult {
  results: {
    formatted_address: string;
  }[];
  status: string;
}

export const useCurrentLocation = (apiKey: string) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLocation = (latitude: number, longitude: number) => {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

      fetch(geocodeUrl)
        .then((response) => response.json())
        .then((data: GeocodeResult) => {
          if (data.status === "OK") {
            const formattedAddress = data.results[0].formatted_address;
            setLocation({
              formatted_address: formattedAddress,
              latitude,
              longitude,
            });
          } else {
            setError("Failed to fetch location details.");
          }
        })
        .catch(() => {
          setError("Failed to fetch location.");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      fetchLocation(latitude, longitude);
    };

    const handleError = () => {
      setError("Unable to retrieve your location.");
      setLoading(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, [apiKey]);

  return { location, error, loading };
};
