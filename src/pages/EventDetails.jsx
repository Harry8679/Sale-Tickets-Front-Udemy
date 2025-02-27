import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`);
        setEvent(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'événement :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleCheckout = async () => {
    try {
      const { data } = await api.post("/checkout", { eventId: id, quantity });
      window.location.href = data.url; // Redirige vers Stripe Checkout
    } catch (error) {
      console.error("Erreur lors de la création de la session de paiement :", error);
    }
  };

  if (loading) return <p className="text-center text-lg">Chargement...</p>;
  if (!event) return <p className="text-center text-red-500 text-lg">Événement introuvable.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{event.name}</h2>
      <p className="text-gray-600 text-lg mb-2">📍 {event.location}</p>
      <p className="text-gray-600 text-lg mb-2">📅 {new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-600 text-lg mb-2">💰 {event.price} €</p>
      <p className="text-gray-600 text-lg mb-4">🎟️ {event.availableTickets} places disponibles</p>

      <div className="flex items-center mb-4">
        <label className="mr-2 text-lg font-semibold">Nombre de billets :</label>
        <input
          type="number"
          min="1"
          max={event.availableTickets}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 w-20 text-center"
        />
      </div>

      <button
        onClick={handleCheckout}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
      >
        🎟️ Réserver maintenant
      </button>
    </div>
  );
};

export default EventDetails;