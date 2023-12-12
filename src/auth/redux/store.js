import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";
import companyReducer from "./companyReducer";
import departmentsReducer from "./departmentsReducer";
import templateReducer from "./templateReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  company: companyReducer,
  departments: departmentsReducer,
  templates: templateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: false,
});

export const persistor = persistStore(store);
