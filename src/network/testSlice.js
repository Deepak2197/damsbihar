import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    catId: "",
    courseId: '',
};

const testSlice = createSlice({
  name: "testseries",
  initialState,
  reducers: {
    addCatId: (state, action) => {
      state.catId = action.payload;
    },
    addCourseId: (state, action) => {
      state.courseId = action.payload;
      },
    
    clearCatId: (state) => {
        state.catId = "";
        state.courseId = "";
    },
  },
});

export const { addCatId,addCourseId, clearCatId } = testSlice.actions;
export default testSlice.reducer;
