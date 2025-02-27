import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("TA_CLE_PUBLIQUE_STRIPE");

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [sessionUrl, setSessionUrl] = useState("");

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
      const { data } = await api.post("/checkout", {
        eventId: id,
        quantity,
      });

      setSessionUrl(data.url);
      window.location.href = data.url; // Redirection vers Stripe Checkout
    } catch (error) {
      console.error("Erreur lors de la création de la session de paiement :", error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!event) return <p>Événement introuvable.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{event.name}</h2>
      <p><strong>Date :</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Lieu :</strong> {event.location}</p>
      <p><strong>Prix :</strong> {event.price} €</p>
      <p><strong>Places disponibles :</strong> {event.availableTickets}</p>

      <div className="mt-4">
        <label>Nombre de billets :</label>
        <input
          type="number"
          min="1"
          max={event.availableTickets}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2"
        />
      </div>

      <button
        onClick={handleCheckout}
        className="bg-blue-500 text-white p-2 mt-4"
      >
        Payer avec Stripe
      </button>
    </div>
  );
};

export default EventDetails;