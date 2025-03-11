import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import authReducer from "./authSlice"; // Vérifie que ce fichier existe bien

const store = configureStore({
  reducer: {
    auth: authReducer, // Authentification
  
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
