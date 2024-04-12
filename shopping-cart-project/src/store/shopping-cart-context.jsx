import { createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const updatedItemsAdd = [...state.items];

      const existingCartItemIndex = updatedItemsAdd.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      const existingCartItem = updatedItemsAdd[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItemsAdd[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find(
          (product) => product.id === action.payload
        );
        updatedItemsAdd.push({
          id: action.payload,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItemsAdd,
      };
    case 'UPDATE_ITEM':
      const updatedItemsUpdate = [...state.items];
      const updatedItemIndex = updatedItemsUpdate.findIndex(
        (item) => item.id === action.payload.productId
      );

      const updatedItem = {
        ...updatedItemsUpdate[updatedItemIndex],
      };

      updatedItem.quantity += action.payload.amount;

      if (updatedItem.quantity <= 0) {
        updatedItemsUpdate.splice(updatedItemIndex, 1);
      } else {
        updatedItemsUpdate[updatedItemIndex] = updatedItem;
      }

      return {
        ...state,
        items: updatedItemsUpdate,
      };
  }

  return state;
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        productId,
        amount,
      },
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
