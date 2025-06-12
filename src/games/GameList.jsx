import { Link } from "react-router"; 
import useQuery from "../api/useQuery";

export default function GameList() {
  const { data: games, loading, error } = useQuery("/games", "games");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading games: {error.message}</p>;
  if (!games?.length) return <p>No games found</p>;

  return (
    <ul className="games-list">
      {games.map((game) => (
        <GameListItem key={game.id} game={game} />
      ))}
    </ul>
  );
}

function GameListItem({ game }) {
  return (
    <li className="game-item">
      <Link to={`/games/${game.id}`} className="game-link">
        <h3>{game.title}</h3>
      
      </Link>
    </li>
  );
}