import { createSlice } from "@reduxjs/toolkit";
import { ProductPrime } from '../../typings'

interface Props {
  items: ProductPrime[]
}

const initialState: Props = {
  items: []
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        basketItem => basketItem.id === action.payload.id
      )
      let newBasket = [...state.items]
      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id})`
        )
      }

      state.items = newBasket
    }
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state: { basket: Props }) => state.basket.items;
export const selectTotal =
  (state: { basket: Props }) =>
    state.basket.items.reduce((total, item) => Math.round((total + item.price + Number.EPSILON) * 100) / 100, 0)

export default basketSlice.reducer;