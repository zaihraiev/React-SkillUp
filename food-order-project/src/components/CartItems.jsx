import CartContext from "../store/CartContext.jsx";
import { useContext } from "react";
import Button from "./UI/Button.jsx";
import Modal from "./UI/Modal.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { currencyFormatter } from "../util/formatting.js";

export default function CartItems() {
  const { items, updateCartItemQuantity } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      {items.length === 0 && <p>No items in cart.</p>}
      {items.length > 0 && (
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id} className="cart-item">
                <p className="item-name">{item.name}</p>
                <p className="item-price">
                  {currencyFormatter.format(item.price)}
                </p>
                <p className="item-quantity">Quantity: {item.quantity}</p>
                <div className="cart-item-actions">
                  <Button onClick={() => updateCartItemQuantity(item.id, -1)}>
                    -
                  </Button>
                  <Button onClick={() => updateCartItemQuantity(item.id, 1)}>
                    +
                  </Button>
                </div>
              </li>
            );
          })}
          <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
          <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>
              Close
            </Button>
            {items.length > 0 && (
              <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
            )}
          </p>
        </ul>
      )}
    </Modal>
  );
}
