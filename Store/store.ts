import { configureStore } from "@reduxjs/toolkit";
import { persistedReducer } from "./reducers";
import persistStore from "redux-persist/es/persistStore";
import { useDispatch } from "react-redux";
const store =configureStore({
    reducer:{
       reducer:persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REGISTER'],
        ignoredPaths: ['register'], // ignore کردن register
      },
    }),
})

export default store
export  const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;