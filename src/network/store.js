// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import cartSlice from "./cartSlice";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const rootReducer = combineReducers({
//   cart: cartSlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// export const persistor = persistStore(store);

// export default store;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import testSlice from "./testSlice";
import medimartSlice from "./medimartSlice";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: cartSlice,
  testseries: testSlice,
  medimart: medimartSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types related to redux-persist
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
