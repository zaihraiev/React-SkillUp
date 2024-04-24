import { createContext, useReducer, useRef } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  updateCartItemQuantity: (id, quantity) => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.id === action.item.id,
      );
      const updatedItems = [...state.items];

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[state.items.indexOf(existingItem)] = updatedItem;
      } else {
        updatedItems.push({ ...action.item, quantity: 1 });
      }

      return { ...state, items: updatedItems };
    }

    case "REMOVE_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.id);
      const updatedItems = [...state.items];

      if (existingItem.quantity === 1) {
        updatedItems.splice(state.items.indexOf(existingItem), 1);
      } else {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity - 1,
        };
        updatedItems[state.items.indexOf(existingItem)] = updatedItem;
      }

      return { ...state, items: updatedItems };
    }

    case "UPDATE_ITEM":
      const updatedItems = [...state.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.quantity;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItems,
      };

    default:
      return state;
  }
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  const ctxValue = {
    items: cart.items,
    addItem,
    removeItem,
    updateCartItemQuantity,
  };

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function updateCartItemQuantity(id, quantity) {
    dispatchCartAction({ type: "UPDATE_ITEM", payload: { id, quantity } });
  }

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
