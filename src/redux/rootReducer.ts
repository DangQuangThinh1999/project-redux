// src/redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  // Add other reducers if needed
});

export default rootReducer;
