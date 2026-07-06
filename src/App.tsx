import styles from "./App.module.scss";
import { Cart } from "./components/Cart/Cart";
import { ProductList } from "./components/ProductList/ProductList";
import { Wrapper } from "./components/utilities/Wrapper/Wrapper";
import { CartProvider } from "./context/CartProvider";

function App() {
  return (
    <>
      <title>Product List with Cart</title>

      <CartProvider>
        <Wrapper>
          <div className={styles.layout}>
            <ProductList />
            <Cart />
          </div>
        </Wrapper>
      </CartProvider>
    </>
  );
}

export default App;
