import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const EventDetails = () => {
  const { id } = useParams(); // Récupère l'ID de l'événement depuis l'URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Chargement...</p>;
  if (!event) return <p>Événement introuvable.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{event.name}</h2>
      <p><strong>Date :</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Lieu :</strong> {event.location}</p>
      <p><strong>Prix :</strong> {event.price} €</p>
      <p><strong>Places disponibles :</strong> {event.availableTickets}</p>
    </div>
  );
};

export default EventDetails;