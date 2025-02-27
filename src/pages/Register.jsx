import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/authSlice";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Ajout du champ name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirmation du mot de passe
  const [error, setError] = useState(""); // Gestion des erreurs

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Réinitialisation des erreurs

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const { data } = await api.post("/users/register", { username, email, password });
      dispatch(setUser({ user: data.user, token: data.token }));
      navigate("/"); // Redirige vers la page d'accueil après l'inscription
    } catch (error) {
      setError(error.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Inscription</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Nom"
          className="border p-2 w-full mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
          className="border p-2 w-full mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          className="border p-2 w-full mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 w-full">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;