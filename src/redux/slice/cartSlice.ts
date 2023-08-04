import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../store";

// Async thunk for fetching list data
export interface Item {
  id: string;
  name: string;
  cost: number;
  quantity: number;
}
export interface IData {
  product: Item[];
}
interface ListItem {
  wareHouse: Item[];
  dataUser: Item[];
  resultSearchWareHouse: Item[];
  resultSearchDataUser: Item[];
  isLoading: boolean;
  error: string | null;
  total: number;
  amount: number;
}
const url = "http://localhost:3000/data.json";
export const fetchListData = createAsyncThunk<
  IData,
  void,
  { state: RootState }
>("cart/fetchListData", async (_, thunkAPI) => {
  try {
    const response: AxiosResponse<IData> = await axios.get(url);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
const initialState: ListItem = {
  wareHouse: [],
  dataUser: [],
  resultSearchWareHouse: [],
  resultSearchDataUser: [],
  amount: 0,
  total: 0,
  isLoading: true,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.dataUser = [];
    },
    addCart: (state, action) => {
      const idItem = action.payload.id;
      const checkId = state.dataUser.find((item: Item) => item.id === idItem);
      if (!checkId) {
        state.dataUser.push({
          ...action.payload,
          quantity: 0,
        });
      }
      state.dataUser[
        state.dataUser.findIndex((item: Item) => item.id === idItem)
      ].quantity++;
    },
    removeItem: (state, action) => {
      const idItem = action.payload;
      state.dataUser = state.dataUser.filter(
        (item: Item) => item.id !== idItem
      );
    },
    updateQuantity: (state, action) => {
      const idItem = action.payload.id;
      state.dataUser[
        state.dataUser.findIndex((item: Item) => item.id === idItem)
      ].quantity = action.payload.quantity;
    },
    totalQuantity: (state) => {
      state.amount = state.dataUser.length;
    },
    totalPrice: (state) => {
      state.total = state.dataUser.reduce(
        (acc, item) => acc + item.quantity * item.cost,
        0
      );
    },
    searchWarehouse: (state, action) => {
      state.resultSearchWareHouse = state.wareHouse.filter((item: Item) =>
        item.name.toLowerCase().includes(action.payload)
      );
    },
    searchDataUser: (state, action) => {
      state.resultSearchDataUser = state.dataUser.filter((item: Item) =>
        item.name.toLowerCase().includes(action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    // Handle pending and fulfilled actions
    builder
      .addCase(fetchListData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchListData.fulfilled,
        (state, action: PayloadAction<IData>) => {
          state.isLoading = false;
          state.wareHouse = action.payload.product;
        }
      )
      .addCase(fetchListData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "An error occurred";
      });
  },
});

export const {
  clearCart,
  addCart,
  totalQuantity,
  totalPrice,
  removeItem,
  updateQuantity,
  searchDataUser,
  searchWarehouse,
} = cartSlice.actions;
export default cartSlice.reducer;
