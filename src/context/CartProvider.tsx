import { useReducer, type ReactNode } from "react";
import { CartDispatchContext, CartValueContext } from "./CartContext";
import { reducer } from "./CartReducer";

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cart, dispatch] = useReducer(reducer, {});

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartValueContext.Provider value={cart}>
        {children}
      </CartValueContext.Provider>
    </CartDispatchContext.Provider>
  );
}
