import { useSelector } from "react-redux";
import {
  DIRECTION_LTR,
  DIRECTION_RTL,
  LANGUAGE_ARABIC,
} from "../../constants/settings";

/* eslint-disable react/prop-types */
export const StarRating = ({ rating, maxRating = 5 }) => {
  const roundedRating = Math.round(rating * 2) / 2;
  const stars = [];

  const { lang, isDark } = useSelector((state) => state.ui);
  const direction = lang === LANGUAGE_ARABIC ? DIRECTION_RTL : DIRECTION_LTR;

  for (let i = 1; i <= maxRating; i++) {
    if (i <= Math.floor(roundedRating)) {
      // Full Star
      stars.push(
        <svg
          key={i}
          className="star full"
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          role="img"
          aria-label="Full star"
        >
          <title>Full star</title>
          <polygon
            points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"
            fill={isDark ? "var(--main-text-hover-color)" : "var(--main-color)"}
            stroke={
              isDark ? "var(--main-text-hover-color)" : "var(--main-color)"
            }
          />
        </svg>
      );
    } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
      // Half Star
      const gradientId = `half-grad-${direction}-${i}`;
      stars.push(
        <svg
          key={i}
          className="star half"
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          role="img"
          aria-label="Half star"
        >
          <title>Half star</title>
          <defs>
            <linearGradient
              id={gradientId}
              x1={direction === DIRECTION_LTR ? "0%" : "100%"}
              y1="0%"
              x2={direction === DIRECTION_LTR ? "100%" : "0%"}
              y2="0%"
            >
              <stop
                offset="50%"
                stopColor={
                  isDark ? "var(--main-text-hover-color)" : "var(--main-color)"
                }
              />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <polygon
            points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"
            fill={`url(#${gradientId})`}
            stroke={
              isDark ? "var(--main-text-hover-color)" : "var(--main-color)"
            }
            transform={
              direction === DIRECTION_RTL
                ? "scale(-1,1) translate(-24,0)"
                : undefined
            }
          />
        </svg>
      );
    } else {
      // Empty Star
      stars.push(
        <svg
          key={i}
          className="star empty"
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          role="img"
          aria-label="Empty star"
        >
          <title>Empty star</title>
          <polygon
            points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"
            fill="none"
            stroke={
              isDark ? "var(--main-text-hover-color)" : "var(--main-color)"
            }
          />
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
        flexDirection: direction === DIRECTION_RTL ? "row-reverse" : "row",
      }}
    >
      {stars}
    </div>
  );
};
