export type Cart = Record<string, number>;

export type Action =
  | { type: "Add"; payload: { slug: string } }
  | { type: "Decrement"; payload: { slug: string } }
  | { type: "Remove"; payload: { slug: string } }
  | { type: "Clear" };

export function reducer(cart: Cart, action: Action): Cart {
  switch (action.type) {
    case "Add": {
      const { slug } = action.payload;
      if (slug == null) return cart;

      if (!Object.hasOwn(cart, slug)) return { ...cart, [slug]: 1 };

      return { ...cart, [slug]: cart[slug] + 1 };
    }

    case "Decrement": {
      const { slug } = action.payload;
      if (slug == null) return cart;

      if (!Object.hasOwn(cart, slug)) return cart;

      if (cart[slug] === 1) {
        const newCart = { ...cart };
        delete newCart[slug];

        return newCart;
      }

      return { ...cart, [slug]: cart[slug] - 1 };
    }

    case "Remove": {
      const { slug } = action.payload;
      if (slug == null) return cart;

      if (!Object.hasOwn(cart, slug)) return cart;

      const newCart = { ...cart };
      delete newCart[slug];

      return newCart;
    }

    case "Clear": {
      return {};
    }

    default:
      throw new Error("Invalid action");
  }
}
