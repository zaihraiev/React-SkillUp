import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const navigateToProducts = () => {
    navigate("/products");
  };

  return (
    <>
      <h1>My Home Page</h1>
      <Link to="/products">The list of products</Link>
      <button onClick={navigateToProducts}>Navigate</button>
    </>
  );
}
