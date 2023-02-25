import { combineReducers, configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { useSelector } from "react-redux";
import { productReducer } from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";



export const persistConfig = {
  key:"root",
  storage,
  whitelist:("user"),
};


const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore(
  {
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
  }
);

export const persistor = persistStore(store);


// Cart 
export {
  // async thunk
  saveCart,fetchCart,
  //reducers
  addCart,removeFromCart,clearCart
} from "./slices/cartSlice";

// USER 
export {authenticateUser} from "./slices/userSlice";
export {logoutUser} from "./slices/userSlice";

//Products
export {
  //async thunks
  saveProduct,fetchHomePageProducts,fetchCategoryProducts,queryProducts,rateProduct,fetchSingleProduct,
  //reducers
  setSelectedProduct,clearSearchProducts,
} from "./slices/productSlice";
// Custom Hooks

// user
export const useUserInfo = () => useSelector((state) => state.user.userInfo);

// products

export const useSelecterProduct = () => useSelector((state) => state.product.selectedProduct);

export const useHomePageProducts = () => useSelector((state) => state.product.homePageProducts);

export const useCategories = () => useSelector((state) => state.product.categories );

export const useCategoryProducts = () => useSelector((state) => state.product.categoryProducts);

export const useSearchResults = () => useSelector((state) => state.product.searchResults);

export const useSingleProduct = () => useSelector((state) => state.product.singleProduct)

//Cart 
export const useCart = () => useSelector((state) => state.cart.cartItems);