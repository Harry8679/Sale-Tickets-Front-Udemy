import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
      <p className="text-gray-600 mb-1">📍 {event.location}</p>
      <p className="text-gray-600 mb-1">🎟️ {event.availableTickets} places dispo</p>
      <p className="text-gray-600 mb-3">💰 {event.price} €</p>
      <Link
        to={`/events/${event._id}`}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 block text-center"
      >
        Voir détails
      </Link>
    </div>
  );
};

export default EventCard;