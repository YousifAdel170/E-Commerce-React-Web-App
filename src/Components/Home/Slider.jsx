// Importing necessary libraries and hooks from React and React Bootstrap
import { useState } from "react";
import { Carousel } from "react-bootstrap";

// Import slider title , delay, slider items and paragraph from constants and data files
import { SLIDER_TITLE } from "../../constants/titles";
import {
  SLIDER_PARAGRAPH,
  slidersItems,
} from "../../data/utilities/slidersItems";
import { SLIDER_DELAY } from "../../constants/delays";

// Import necessary CSS styles for the component
import "./Slider.css";

// Component Responsible for rendering the slider
const Slider = () => {
  // State to manage the active index of the carousel
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => setIndex(selectedIndex);

  // Returning the carousel component with multiple items
  return (
    // Carousel component from react-bootstrap
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {/* Each Carousel.Item represents a slide in the carousel */}
      {slidersItems
        ? slidersItems.map((item, index) => (
            <Carousel.Item
              key={index}
              className={`slider-background slider-${item.styleClass}`}
              interval={SLIDER_DELAY}
            >
              <div className="d-flex justify-content-center align-items-center flex-column-mobile">
                <img src={item.image} alt={`${SLIDER_TITLE} Image`} />
                <div>
                  <h3 className="slider-title">{SLIDER_TITLE}</h3>
                  <p className="slider-text">{SLIDER_PARAGRAPH}</p>
                </div>
              </div>
            </Carousel.Item>
          ))
        : null}
    </Carousel>
  );
};

export default Slider;
