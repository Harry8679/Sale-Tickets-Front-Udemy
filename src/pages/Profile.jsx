import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Récupérer l'utilisateur depuis Redux
  const user = useSelector((state) => state.auth.user);

  // Gérer la déconnexion
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Rediriger vers la page de connexion après déconnexion
  };

  // Si aucun utilisateur connecté, rediriger vers la connexion
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">
          Vous devez être connecté pour accéder à votre profil.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Mon Profil</h2>
        
        <div className="mb-4">
          <p className="text-gray-700"><strong>Nom :</strong> {user.username}</p>
          <p className="text-gray-700"><strong>Email :</strong> {user.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 w-full rounded hover:bg-red-600"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default Profile;