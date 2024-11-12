import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartItem from "../models/CartItem";
import Product from "../models/Product";

const initialState: { items: CartItem[] } = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const itemIndex = state.items.findIndex(
        (item) => item.title === action.payload.title
      );
      if (itemIndex > -1) {
        state.items[itemIndex].quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex(
        (item) => item.title === action.payload
      );
      if (itemIndex > -1) {
        if (state.items[itemIndex].quantity === 1) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity--;
        }
      }
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex(
        (item) => item.title === action.payload
      );
      if (itemIndex > -1) {
        state.items.splice(itemIndex, 1);
      }
    },
  },
});

export const cartActions = cartSlice.actions;

const store = configureStore({
  reducer: cartSlice.reducer,
});

export default store;
