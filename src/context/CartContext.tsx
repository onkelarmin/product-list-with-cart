import { createContext, type Dispatch } from "react";
import type { Action, Cart } from "./CartReducer";

export const CartValueContext = createContext<Cart | null>(null);
export const CartDispatchContext = createContext<Dispatch<Action> | null>(null);
