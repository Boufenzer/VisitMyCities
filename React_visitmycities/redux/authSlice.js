import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  user: null, // L'utilisateur est initialement null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      AsyncStorage.setItem("user", JSON.stringify(action.payload)); // Sauvegarde dans AsyncStorage
    },
    logout: (state) => {
      state.user = null;
      AsyncStorage.removeItem("user"); // Supprime l'utilisateur stocké
    },

  },
});

export const { setUser, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
