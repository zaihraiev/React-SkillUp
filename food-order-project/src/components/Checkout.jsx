import Modal from "./UI/Modal.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import useHttps from "../hooks/useHttps.jsx";
import Error from "./Error.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartContext = useContext(CartContext);
  const userContext = useContext(UserProgressContext);

  const { data, isLoading, error, sendRequest } = useHttps(
    "http://localhost:3000/orders",
    requestConfig,
  );

  const cartTotal = cartContext.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  function handleCloseModal() {
    userContext.hideCheckout();
  }

  function handleFinnish() {
    userContext.hideCheckout();
    cartContext.clearCart();
  }

  function handleSubmitOrder(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartContext.items,
          customer: customerData,
        },
      }),
    );
  }

  let actions = (
    <>
      <Button textOnly onClick={handleCloseModal} type="button">
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (isLoading) {
    actions = <span>Sending order data...</span>;
  }

  if (data) {
    return (
      <Modal open={userContext.progress === "checkout"} onClose={handleFinnish}>
        <h2>Success!</h2>
        <p>Your order has been successfully submitted.</p>
        <p>
          We will get back to you to confirm your order within the next few
          minutes by email.
        </p>
        <p>Thank you for shopping with us!</p>
        <p className="modal-actions">
          <Button onClick={handleFinnish}>Okay</Button>
        </p>
      </Modal>
    );
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

        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
