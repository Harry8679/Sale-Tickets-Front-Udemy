import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import QRCode from "react-qr-code";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (user) {
        try {
          const { data } = await api.get("/reservations/mine");
          setReservations(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des réservations :", error);
        }
      }
    };

    fetchReservations();
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Mon Profil</h2>

        <div className="mb-6">
          <p className="text-gray-700 text-lg"><strong>👤 Nom :</strong> {user.username}</p>
          <p className="text-gray-700 text-lg"><strong>📧 Email :</strong> {user.email}</p>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-4">🎟️ Mes Billets</h3>
        
        {reservations.length > 0 ? (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div key={reservation._id} className="border p-4 rounded-lg shadow-md bg-gray-50">
                <p className="text-lg font-semibold">{reservation.event.name}</p>
                <p className="text-gray-600">📍 {reservation.event.location}</p>
                <p className="text-gray-600">📅 {new Date(reservation.event.date).toLocaleDateString()}</p>
                <p className="text-gray-600">🎟️ {reservation.ticketsBought} billet(s)</p>

                <div className="flex justify-center mt-4">
                  <QRCode value={`reservation-${reservation._id}`} size={100} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Vous n'avez réservé aucun billet.</p>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg mt-6 hover:bg-red-600 transition-all duration-300"
        >
          🚪 Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default Profile;