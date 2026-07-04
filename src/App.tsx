import { ProductList } from "./components/ProductList/ProductList";
import { CartProvider } from "./context/CartProvider";

function App() {
  return (
    <CartProvider>
      <ProductList />
    </CartProvider>
  );
}

export default App;
