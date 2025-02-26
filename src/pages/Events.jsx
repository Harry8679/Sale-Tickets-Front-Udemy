import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../slices/eventSlice";
import EventCard from "../components/EventCard";

const Events = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">📅 Événements disponibles</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;