import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import { useContext, useRef } from "react";
import CartContext from "../store/CartContext.jsx";
import Modal from "./UI/Modal.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const { items } = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartQuantity = items.length;

  function handleModalOpen() {
    userProgressCtx.showCart();
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="Restaurant" />
          <h1>ReactFood</h1>
        </div>
        <nav>
          <Button onClick={handleModalOpen} textOnly>
            Cart ({cartQuantity})
          </Button>
        </nav>
      </header>
    </>
  );
}
