import { useContext } from "react";
import { CartDispatchContext, CartValueContext } from "./CartContext";

export function useCartValue() {
  const value = useContext(CartValueContext);

  if (value == null)
    throw new Error("Should be used inside CartValueContext Provider");

  return value;
}

export function useCartDispatch() {
  const value = useContext(CartDispatchContext);

  if (value == null)
    throw new Error("Should be used inside CartDispatchContext Provider");

  return value;
}
