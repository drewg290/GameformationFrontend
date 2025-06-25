import GameList from "./GameList";
import { useState } from "react";

export default function GamePage() {
  const [search, setSearch] = useState("");

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <hr></hr>

      <form id="searchbar" onSubmit={onSearchSubmit}>
        <div>
          <input
            type="search"
            id="mySearch"
            name="q"
            value={search}
            onChange={onSearchChange}
            placeholder="Search games..."
          />
        </div>
      </form>

      <GameList search={search} />
    </>
  );
}
