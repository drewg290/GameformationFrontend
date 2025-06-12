import GameList from "./GameList";

export default function GamePage() {
  return (
    <>
      <hr></hr>
      <h3>Gameformation</h3>
      <form>
        <div>
          <input type="search" id="mySearch" name="q" />
          <button>Search</button>
        </div>
      </form>
      <GameList />
    </>
  );
}