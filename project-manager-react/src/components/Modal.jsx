import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef } from "react";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="bg-stone-700 text-white rounded-lg shadow-md p-4"
    >
      {children}
      <form method="dialog">
        <div className="flex justify-end">
          <button className="px-6 py-2 mt-4 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">
            {buttonCaption}
          </button>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal-root")
  );
});

export default Modal;
