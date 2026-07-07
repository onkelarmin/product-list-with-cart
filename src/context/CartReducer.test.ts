import { describe, expect, it } from "vitest";
import { reducer } from "./CartReducer";

describe("CartReducer", () => {
  it("adds the new product with quantity 1 if it doesn't exist yet", () => {
    const slug = "new-product";
    const state = {};

    const newState = reducer(state, { type: "Add", payload: { slug } });

    expect(newState).toEqual({ [slug]: 1 });
    expect(newState).not.toBe(state);
  });

  it("increases the quantity of a product by 1 if it already exists", () => {
    const slug = "existing-product";
    const state = { [slug]: 1 };

    const newState = reducer(state, { type: "Add", payload: { slug } });

    expect(newState).toEqual({ [slug]: 2 });
    expect(newState).not.toBe(state);
  });

  it("removes an existing product if its quantity is 1", () => {
    const slug1 = "existing-product";
    const slug2 = "another-product";

    const state = {
      [slug1]: 1,
      [slug2]: 1,
    };

    const newState = reducer(state, {
      type: "Decrement",
      payload: { slug: slug1 },
    });

    expect(newState).toEqual({ [slug2]: 1 });
    expect(newState).not.toBe(state);
  });

  it("decrements an existing product if its quantity is greater than 1", () => {
    const slug1 = "existing-product";
    const slug2 = "another-product";

    const state = {
      [slug1]: 2,
      [slug2]: 1,
    };

    const newState = reducer(state, {
      type: "Decrement",
      payload: { slug: slug1 },
    });

    expect(newState).toEqual({ [slug1]: 1, [slug2]: 1 });
    expect(newState).not.toBe(state);
  });

  it("removes the correct product", () => {
    const slug1 = "existing-product";
    const slug2 = "another-product";

    const state = {
      [slug1]: 2,
      [slug2]: 2,
    };

    const newState = reducer(state, {
      type: "Remove",
      payload: { slug: slug1 },
    });

    expect(newState).toEqual({ [slug2]: 2 });
    expect(newState).not.toBe(state);
  });

  it("clears the full cart", () => {
    const slug1 = "existing-product";
    const slug2 = "another-product";

    const state = {
      [slug1]: 2,
      [slug2]: 2,
    };

    const newState = reducer(state, {
      type: "Clear",
    });

    expect(newState).toEqual({});
    expect(newState).not.toBe(state);
  });

  it("returns the old state if 'Decrement' is called with an incorrect payload", () => {
    const slug1 = "existing-product";
    const slug2 = "another-product";

    const state = {
      [slug1]: 2,
      [slug2]: 2,
    };

    const newState = reducer(state, {
      type: "Decrement",
      payload: { slug: "missing" },
    });

    expect(newState).toEqual(state);
  });

  it("returns the old state if 'Remove' is called with an incorrect payload", () => {
    const slug1 = "existing-product";
    const slug2 = "another-product";

    const state = {
      [slug1]: 2,
      [slug2]: 2,
    };

    const newState = reducer(state, {
      type: "Remove",
      payload: { slug: "missing" },
    });

    expect(newState).toEqual(state);
  });
});
