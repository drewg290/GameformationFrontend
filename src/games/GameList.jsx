import { Link } from "react-router";
import useQuery from "../api/useQuery";

export default function GameList({ search }) {
  const { data: games, loading, error } = useQuery("/games", "games");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading games: {error.message}</p>;
  if (!games?.length) return <p>No games found</p>;
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredGames.length === 0) return <p>No games match your search.</p>;

  return (
    <ul className="games-list">
      {filteredGames.map((game) => (
        <GameListItem key={game.id} game={game} />
      ))}
    </ul>
  );
}

function GameListItem({ game }) {
  return (
    <li className="game-item">
      <Link to={`/games/${game.id}`} className="game-link">
        <h2>{game.title}</h2>
      </Link>
    </li>
  );
}
