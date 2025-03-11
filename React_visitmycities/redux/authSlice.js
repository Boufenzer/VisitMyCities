import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null, // L'utilisateur est initialement null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
   
    },
    logout: (state) => {
      state.user = null;
     
    },

  },
});

export const { setUser, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
