import { useParams } from "react-router";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function GameDetails() {
  const parms = useParams();

  const { data } = useQuery(`/games/${parms.id}`, "game");
  if (!data) return <p>no data</p>;

  return (
    <>
      <hr></hr>
      <div className="game-details">
        <article id="game-description">
          <section className="game-sections">
            <h1>{data.title}</h1>
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
    <ul id="gamereview">
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

  const { token } = useAuth();

  const { mutate } = useMutation("POST", "/reviews", ["reviews"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must be logged in to submit a review");
      return;
    }
    mutate({ title, rating, content, game_id: gameId });
    window.location.reload();
  };

  return (
    <ul className="reviewcreator">
      <form onSubmit={handleSubmit}>
        <div>
          <div className="reviewTop">
            <input
              className="reviewcreate-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title here"
            />
            <br />{" "}
            <input
              className="reviewcreate-rating"
              type="text"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="Enter Rating Out of 5"
            />
            <br />
          </div>
          <textarea
            className="reviewcreate-review"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter Review"
          />
          <br />

          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </ul>
  );
}

function ReviewListItem({ review }) {
  return (
    <li className="game-item">
<img className = "guestpfp" src = "/download.png"/>
      <div>
      <h2 className="review-title">
        {review.title} {review.rating}/5
      </h2>
      <h4>{review.content}</h4>
      </div>

    </li>
  );
}
