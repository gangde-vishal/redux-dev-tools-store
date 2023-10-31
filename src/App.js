import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useEffect } from "react";
import { getCartItems, totalCalculation } from "./feature/cart/cartSlice";
import Modal from "./components/Modal";

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isModalOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalCalculation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return <div className="loading">Loading.....</div>;
  }

  return (
    <main>
      {isModalOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
