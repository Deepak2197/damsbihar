import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  productId: "",
  productTitle: "",
  subId: "",
};

const medimartSlice = createSlice({
  name: "medimart",
  initialState,
  reducers: {
    addproductId: (state, action) => {
      state.productId = action.payload;
    },

    addproductTitle: (state, action) => {
      state.productTitle = action.payload;
    },
    addproductSlug: (state, action) => {
      state.productSlug = action.payload;
    },

    addsubId: (state, action) => {
      state.subId = action.payload;
    },
  },
});

export const { addproductId, addproductTitle, addproductSlug, addsubId } =
  medimartSlice.actions;
export default medimartSlice.reducer;
