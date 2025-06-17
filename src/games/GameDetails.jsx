import { useParams } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useState } from "react";
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
        <ReviewCreator gameId={parms.id} />
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
    <ul>
      {reviews.map((review) => (
        <ReviewListItem key={review.game_id} review={review} />
      ))}
    </ul>
  );
}
function ReviewCreator({ gameId }) {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [content, setContent] = useState("");

  const {
    data: reviews,
    loading,
    error,
  } = useQuery(`/reviews/${gameId}`, "reviews");

  const { mutate } = useMutation("POST", "/reviews", ["reviews"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ title, rating, content, game_id: gameId });
  };

  return (
    <ul className="games-list">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title here"
          />
          <br />
          <input
            type="text"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Enter Rating Out of 5"
          />
          <br />
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter Review"
          />
          <br />
          <button type="submit">Submit</button>
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
