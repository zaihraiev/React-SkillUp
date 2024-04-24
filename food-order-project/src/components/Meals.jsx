import MealItem from "./MealItem.jsx";
import useHttps from "../hooks/useHttps.jsx";
import Error from "./Error.jsx";

const requestConfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Meals() {
  const {
    data: mealsState,
    isLoading,
    error,
  } = useHttps("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching data...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch data" message={error} />;
  }

  return (
    <ul id="meals">
      {mealsState.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
}
