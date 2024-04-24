import Modal from "./UI/Modal.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserProgressContext);

  const cartTotal = cartContext.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  function handleCloseModal() {
    userContext.hideCheckout();
  }

  function handleSubmitOrder(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  }

  return (
    <Modal
      open={userContext.progress === "checkout"}
      onClose={handleCloseModal}
    >
      <form onSubmit={handleSubmitOrder}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input id="full-name" label="Full name" type="text" />
        <Input id="email" label="Email address" type="email" />
        <Input id="street" label="Street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
      </form>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseModal}>
          Close
        </Button>
        <Button>Submit Order</Button>
      </p>
    </Modal>
  );
}
