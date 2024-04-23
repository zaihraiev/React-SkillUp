import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item) => item.id === action.item.id,
      );

      const updatedItemsToAdd = [...state.items];

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItemsToAdd[state.items.indexOf(existingItem)] = updatedItem;
      } else {
        updatedItemsToAdd.push({ ...action.item, quantity: 1 });
      }

      return { ...state, items: updatedItemsToAdd };
    case "REMOVE_ITEM":
      const existingCartItem = state.find((item) => item.id === action.id);
      const updatedItemsToRemove = [...state.items];

      if (existingCartItem.quantity === 1) {
        updatedItemsToRemove.splice(state.items.indexOf(existingCartItem), 1);
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatedItemsToRemove[state.items.indexOf(existingCartItem)] =
          updatedItem;
      }

      return { ...state, items: updatedItemsToRemove };
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
  };

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
