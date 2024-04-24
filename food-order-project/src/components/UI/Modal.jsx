import { useEffect, useRef } from "react";
import CartContext from "../../store/CartContext.jsx";
import { createPortal } from "react-dom";

export default function Modal({ children, className, open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    return () => {
      modal.close();
    };
  }, [open]);

  let styles = "modal";
  if (className && className.trim() !== "") {
    styles += ` ${className}`;
  }

  return createPortal(
    <dialog className={styles} ref={dialog} onClose={onClose}>
      <div>{children}</div>
    </dialog>,
    document.getElementById("modal"),
  );
}
