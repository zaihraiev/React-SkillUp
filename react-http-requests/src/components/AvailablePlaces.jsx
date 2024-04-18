import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchPlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFeatching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAvailablePlaces() {
      setIsFetching(true);

      try {
        const places = await fetchPlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude,
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError(error);
        setIsFetching(false);
      }
    }

    fetchAvailablePlaces();
  }, []);

  if (error) {
    return <Error message={error.message} title="Error occured" />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFeatching}
      loadingText="Loading available places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
