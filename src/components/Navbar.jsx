import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../slices/authSlice";
import { logout } from '../slices/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/" className="text-lg font-bold">🎟️ EventBooking</Link>
      <div>
        {user ? (
          <>
            <Link to="/profile" className="mr-4">Profil</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Connexion</Link>
            <Link to="/register" className="bg-green-500 px-3 py-1 rounded">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;