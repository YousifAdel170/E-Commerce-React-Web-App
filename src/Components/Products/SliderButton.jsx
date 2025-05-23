/* eslint-disable react/prop-types */

import leftArrow from "../../assets/icons/left-arrow.svg";
import rightArrow from "../../assets/icons/right-arrow.svg";

// Component resposible to handle the slider button
const SliderButton = ({ direction, onClick, disabled }) => {
  const src = direction === "right" ? rightArrow : leftArrow;
  const alt = direction === "right" ? "Next Slide" : "Previous Slide";
  const className = `slider-button ${direction}`;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
      tabIndex={0}
      aria-disabled={disabled}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
          e.preventDefault();
          onClick();
        }
      }}
    />
  );
};

export default SliderButton;
