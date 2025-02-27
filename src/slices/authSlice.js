import { createSlice } from "@reduxjs/toolkit";

// ✅ Vérifie si "user" est défini avant d'essayer de le parser
const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  token: localStorage.getItem("token") || null,
};

// ✅ Création du slice Redux pour l'auth
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 📌 Action pour définir l'utilisateur après inscription/connexion
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },

    // 📌 Déconnexion
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

// ✅ Export des actions et du reducer
export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;