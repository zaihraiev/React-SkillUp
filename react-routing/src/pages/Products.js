import { Link } from "react-router-dom";

const PRODUCTS = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
  { id: 3, name: "Product 3" },
];

export default function ProductsPage() {
  return (
    <>
      <div>Products Page</div>
      <ul>
        {PRODUCTS.map((item) => {
          return (
            <li key={item.id}>
              <Link to={`/products/product/${item.id}`} relative="">
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
