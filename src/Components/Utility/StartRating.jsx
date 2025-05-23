/* eslint-disable react/prop-types */
export const StarRating = ({ rating, maxRating = 5 }) => {
  // Round rating to nearest half star
  const roundedRating = Math.round(rating * 2) / 2;

  // Create array for stars
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    if (i <= roundedRating) {
      stars.push(
        <svg
          key={i}
          aria-hidden="true"
          focusable="false"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#ffc107"
          stroke="#ffc107"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
        >
          <title>Star</title>
          <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
        </svg>
      );
    } else if (i - 0.5 === roundedRating) {
      // half star
      stars.push(
        <svg
          key={i}
          aria-hidden="true"
          focusable="false"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffc107"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
        >
          <title>Half star</title>
          <defs>
            <linearGradient id="half-grad">
              <stop offset="50%" stopColor="#ffc107" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"
            fill="url(#half-grad)"
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          aria-hidden="true"
          focusable="false"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffc107"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
        >
          <title>Empty star</title>
          <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
        </svg>
      );
    }
  }
  return (
    <div
      className="star-rating"
      aria-label={`Rating: ${rating} out of ${maxRating} stars`}
      role="img"
      style={{ display: "flex", gap: "2px" }}
    >
      {stars}
    </div>
  );
};
