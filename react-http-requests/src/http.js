import Error from "./components/Error.jsx";

export async function fetchPlaces() {
  const response = await fetch("http://localhost:3000/places");
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message);
  }

  return responseData.message;
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data.places;
}
