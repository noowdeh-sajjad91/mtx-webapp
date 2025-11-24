import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// import cartReducer from "./cart.reducer/cartReducer";
import userReducer from "./user.reducer/user.reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

const rootReducer = combineReducers({
//   cart: cartReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
   whitelist: ['user']
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
