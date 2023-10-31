import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItems from "./CartItems";
import { clearCart } from "../feature/cart/cartSlice";
import { openModal } from "../feature/modal/modalSlice";

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  if (amount < 1 || cartItems.length < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      {/* cart header */}
      <header>
        <h2>Your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cartItems.map((item) => {
          return <CartItems key={item.id} {...item} />;
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
          <button
            className="btn clear-btn"
            type="button"
            onClick={() => {
              // dispatch(clearCart());
              dispatch(openModal());
            }}
          >
            Clear Cart
          </button>
        </div>
      </footer>
    </section>
  );
};

export default CartContainer;
