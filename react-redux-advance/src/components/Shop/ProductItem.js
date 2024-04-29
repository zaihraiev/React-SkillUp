import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { title, price, description, id } = product;

  const addToCartHandler = () => {
    dispatch(cartActions.addItemToCart(product));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{product.title}</h3>
          <div className={classes.price}>${product.price.toFixed(2)}</div>
        </header>
        <p>{product.description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
