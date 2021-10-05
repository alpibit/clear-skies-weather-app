import { createSlice } from "@reduxjs/toolkit";

const searchBarValueSlice = createSlice({
  name: "searchBarValue",
  initialState: { text: "" },
  reducers: {
    textReceive(state, action) {
      state.text = action.payload;
    },
  },
});

export const searchActions = searchBarValueSlice.actions;

export default searchBarValueSlice.reducer;
