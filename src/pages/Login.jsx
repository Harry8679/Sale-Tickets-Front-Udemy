import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Ajout gestion erreur

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/users/login", { email, password });
      const { data } = response;

      // Vérification des données reçues avant de les stocker
      if (data && data.user && data.token) {
        dispatch(setUser({ user: data.user, token: data.token }));
        navigate("/");
      } else {
        setError("Identifiants incorrects ou problème serveur.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Erreur lors de la connexion.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Connexion</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;