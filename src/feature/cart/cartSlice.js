import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://course-api.com/react-useReducer-cart-project";
const initialState = {
  cartItems: [],
  total: 0,
  amount: 5,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    return console.log(err);
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      console.log(action);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    totalCalculation: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount = amount + item.amount;
        total = total + item.amount * item.price;
      });
      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearCart, removeItem, increase, decrease, totalCalculation } =
  cartSlice.actions;

export default cartSlice.reducer;
