import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import buildingReducer from './buildingReducer';
import authReducer from "./authSlice"; // Vérifie que ce fichier existe bien

const store = configureStore({
  reducer: {
    auth: authReducer, // Authentification
    building: buildingReducer, // Gestion des bâtiments et listes déroulantes
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
