import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem(state, action) {
      const itemindex = state.items.findIndex(
        (item) => item.title === action.payload.title
      );
      if (itemindex > -1) {
        state.items[itemindex].quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action) {
      const itemindex = state.items.findIndex(
        (item) => item.title === action.payload
      );
      if (state.items[itemindex].quantity === 1) {
        state.items.splice(itemindex, 1);
      } else {
        state.items[itemindex].quantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default configureStore({ reducer: cartSlice.reducer });
