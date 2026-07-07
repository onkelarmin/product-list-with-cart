import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "./ProductCard";
import { CartProvider } from "../../context/CartProvider";

describe("ProductCard component", () => {
  const product = {
    name: "Waffle with Berries",
    slug: "waffle-with-berries",
    category: "Waffle",
    price: 6.5,
    image: {
      thumbnail: {
        src: "waffleWithBerriesThumbnail",
        width: 100,
        height: 96,
      },
      mobile: {
        src: "waffleWithBerriesMobile",
        width: 654,
        height: 424,
      },
      tablet: {
        src: "waffleWithBerriesTablet",
        width: 427,
        height: 424,
      },
      desktop: {
        src: "waffleWithBerriesDesktop",
        width: 502,
        height: 480,
      },
    },
  };

  it("adds the product and increment/decrement buttons work", async () => {
    const user = userEvent.setup();
    const productName = product.name;

    render(
      <CartProvider>
        <ProductCard product={product} priorityImage />
      </CartProvider>,
    );

    await user.click(
      screen.getByRole("button", {
        name: `Add ${productName} to Cart`,
      }),
    );

    expect(await screen.findByText("1")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: `Add ${productName} to Cart`,
      }),
    ).not.toBeInTheDocument();

    const incrementButton = await screen.findByRole("button", {
      name: `Increase ${productName} quantity`,
    });
    const decrementButton = await screen.findByRole("button", {
      name: `Decrease ${productName} quantity`,
    });

    await user.click(incrementButton);
    expect(await screen.findByText("2")).toBeInTheDocument();

    await user.click(decrementButton);
    expect(await screen.findByText("1")).toBeInTheDocument();

    await user.click(decrementButton);

    expect(
      screen.getByRole("button", {
        name: `Add ${productName} to Cart`,
      }),
    ).toBeInTheDocument();
  });
});
