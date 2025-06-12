import { useParams } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function GameDetails() {
  const parms = useParams();

  const { data } = useQuery(`/games/${parms.id}`, "game");
  if (!data) return <p>no data</p>;

  return (
    <>
      <hr></hr>
      <div className="game-details">
        <article>
          <section className="game-sections">
            <h2>{data.title}</h2>
          </section>
          <section className="book-sections">
            <h3>{data.description}</h3>
          </section>
        </article>
        <ReviewList gameId={parms.id} />
      </div>
    </>
  );
}
function ReviewList({ gameId }) {
  const {
    data: reviews,
    loading,
    error,
  } = useQuery(`/reviews/${gameId}`, "reviews");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading reviews: {error.message}</p>;
  if (!reviews?.length) return <p>No reviews found</p>;

  return (
    <ul className="games-list">
      {reviews.map((review) => (
        <ReviewListItem key={review.game_id} review={review} />
      ))}

      <form>
        <div>
          <input
            type="text"
            id="title"
            name="q"
            placeholder="Enter a title here"
          />
          <br></br>
          <input
            type="text"
            id="title"
            name="q"
            placeholder="Enter Rating Out of 5"
          />
          <br></br>
          <input type="text" id="title" name="q" placeholder="Enter Review" />
          <br></br>
          <button>Submit</button>
        </div>
      </form>
    </ul>
  );
}

function ReviewListItem({ review }) {
  return (
    <li className="game-item">
      <h3>
        {review.title} {review.rating}/5
      </h3>
      <h4>{review.content}</h4>
    </li>
  );
}
