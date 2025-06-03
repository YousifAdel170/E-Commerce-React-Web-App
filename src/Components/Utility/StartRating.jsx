/* eslint-disable react/prop-types */
export const StarRating = ({ rating, maxRating = 5, direction = "ltr" }) => {
  const roundedRating = Math.round(rating * 2) / 2;
  const stars = [];

  // Define gradient id uniquely per star to avoid conflicts
  // (Could be improved by unique id per component instance)

  for (let i = 1; i <= maxRating; i++) {
    if (i <= Math.floor(roundedRating)) {
      // full star
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
    } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
      // half star with gradient depending on direction
      const gradientId = `half-grad-${direction}-${i}`;
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
            <linearGradient
              id={gradientId}
              x1={direction === "ltr" ? "100%" : "0%"}
              y1="0%"
              x2={direction === "ltr" ? "0%" : "100%"}
              y2="0%"
            >
              {direction === "ltr" ? (
                <>
                  <stop offset="50%" stopColor="#ffc107" />
                  <stop offset="50%" stopColor="transparent" />
                </>
              ) : (
                <>
                  <stop offset="50%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#ffc107" />
                </>
              )}
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"
            fill={`url(#${gradientId})`}
            transform={
              direction === "rtl" ? "scale(-1,1) translate(-24,0)" : undefined
            }
          />
        </svg>
      );
    } else {
      // empty star
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
      style={{
        display: "flex",
        gap: "2px",
        flexDirection: direction === "rtl" ? "row-reverse" : "row",
      }}
    >
      {stars}
    </div>
  );
};
