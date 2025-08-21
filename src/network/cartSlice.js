import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cbtregionId: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    updateQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
       
    },
    getcbtRegionId: (state, action) => {
      state.cbtregionId = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  getcbtRegionId,
} = cartSlice.actions;
export default cartSlice.reducer;
