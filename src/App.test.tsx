import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { products } from "./data/products";
import { formatCurrency } from "./utils/formatCurrency";

describe("App Integration", () => {
  it("shows product in cart when added", async () => {
    const user = userEvent.setup();

    render(<App />);

    const productName = "Waffle with Berries";

    await user.click(
      screen.getByRole("button", { name: `Add ${productName} to Cart` }),
    );

    const cart = screen.getByRole("complementary", { name: /your cart/i });

    expect(within(cart).getByText(productName)).toBeInTheDocument();
    expect(within(cart).getByText("1x")).toBeInTheDocument();
  });

  it("updates the cart total when a product is added", async () => {
    const user = userEvent.setup();

    render(<App />);

    const productSlug = "waffle-with-berries";

    const product = products.find((product) => product.slug === productSlug);

    if (product == null) throw new Error("Test product not found");

    await user.click(
      screen.getByRole("button", {
        name: `Add ${product.name} to Cart`,
      }),
    );

    const cart = screen.getByRole("complementary", { name: /your cart/i });

    const total = within(cart).getByLabelText("Order total");

    expect(total).toHaveTextContent(formatCurrency(product.price));

    await user.click(
      screen.getByRole("button", { name: `Increase ${product.name} quantity` }),
    );

    expect(within(cart).getByLabelText("Order total")).toHaveTextContent(
      formatCurrency(product.price * 2),
    );
  });

  it("opens the dialog if the the order gets confirmed", async () => {
    const user = userEvent.setup();

    render(<App />);

    const productSlug = "waffle-with-berries";

    const product = products.find((product) => product.slug === productSlug);

    if (product == null) throw new Error("Test product not found");

    await user.click(
      screen.getByRole("button", {
        name: `Add ${product.name} to Cart`,
      }),
    );

    await user.click(screen.getByRole("button", { name: "Confirm Order" }));

    expect(
      screen.getByRole("dialog", { name: "Order Confirmed" }),
    ).toBeInTheDocument();
  });

  it("clears the cart if a new order is started", async () => {
    const user = userEvent.setup();

    render(<App />);

    const productSlug = "waffle-with-berries";

    const product = products.find((product) => product.slug === productSlug);

    if (product == null) throw new Error("Test product not found");

    await user.click(
      screen.getByRole("button", {
        name: `Add ${product.name} to Cart`,
      }),
    );

    expect(
      screen.getByRole("list", { name: "Cart items" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Confirm Order" }));

    await user.click(screen.getByRole("button", { name: "Start New Order" }));

    expect(
      screen.queryByRole("list", { name: "Cart items" }),
    ).not.toBeInTheDocument();
  });
});
