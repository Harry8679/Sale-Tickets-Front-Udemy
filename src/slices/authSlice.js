import { createSlice } from "@reduxjs/toolkit";

// ✅ État initial de l'authentification
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Récupère l'utilisateur s'il est stocké en local
  token: localStorage.getItem("token") || null, // Récupère le token s'il est stocké
};

// ✅ Création du slice Redux pour l'auth
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 📌 Action pour définir l'utilisateur
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    // 📌 Action pour déconnecter l'utilisateur
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

// ✅ Export des actions
export const { setUser, logout } = authSlice.actions;

// ✅ Export du reducer
export default authSlice.reducer;