import React from "react";
import { ChevronUp, ChevronDown } from "../icons";
import { increase, decrease, removeItem } from "../feature/cart/cartSlice";
import { useDispatch } from "react-redux";
const CartItems = ({ id, title, price, img, amount }) => {
  const dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">{price}</h4>
        <button
          className="remove-btn"
          type="button"
          onClick={() => dispatch(removeItem(id))}
        >
          remove
        </button>
      </div>
      {/* increase amount */}
      <div>
        <button
          className="amount-btn"
          onClick={() => dispatch(increase({ id }))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          className="amount-btn"
          onClick={() => {
            if (amount === 1) {
              return;
            }
            dispatch(decrease({ id }));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItems;
