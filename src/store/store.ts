import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import categories from "./Category/categorySlice";
import products from "./Product/productSlice";
import cart from "./cart/cartSlice";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import wishlist from "@store/wishlist/wishlistSlice"
import auth from "@store/auth/authSlice"
import review from "@store/Review/reviewSlice"
import orders from "@store/order/orderSlice"

const cartPresistConfig = {
  key: "cart",
  storage,
  whiteList: ["items"],
};

const authPresistConfig = {
  key:"auth",
  storage,
  wishlist:["accessToken","user"]
}

const rootPresistConfig= {
  key:"root",
  storage,
  wishlist:["cart","auth"]
}


const rootReducer = combineReducers({
  categories,
  products,
  wishlist,
  review,
  cart: persistReducer(cartPresistConfig, cart),
  auth:persistReducer(authPresistConfig,auth),
  orders
});

const presistedReducer = persistReducer(rootPresistConfig,rootReducer)

const store = configureStore({
  reducer: presistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      
      // serializableCheck: {
        
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { persistor, store };
