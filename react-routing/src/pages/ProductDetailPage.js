import { useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const params = useParams();

  return (
    <div>
      <h1>ProductDetailPage</h1>
      <p>{params.id}</p>
    </div>
  );
}
