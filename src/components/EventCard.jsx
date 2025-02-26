import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{event.name}</h3>
      <p>{event.location}</p>
      <p>🎟️ {event.availableTickets} places dispo</p>
      <p>💰 {event.price} €</p>
      <Link to={`/events/${event._id}`} className="text-blue-500">Voir détails</Link>
    </div>
  );
};

export default EventCard;