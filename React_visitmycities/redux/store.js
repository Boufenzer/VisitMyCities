import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Vérifie que le fichier existe bien

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
