import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold">Bienvenue sur EventBooking 🎟️</h1>
      <p className="mt-2">Réservez vos billets pour les meilleurs événements</p>
      <Link to="/events" className="mt-4 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg">
        Voir les événements
      </Link>
    </div>
  );
};

export default Home;