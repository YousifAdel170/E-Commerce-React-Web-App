// Importing necessary libraries and hooks from React and React Bootstrap
import { useState } from "react";
import { Carousel } from "react-bootstrap";
// Import necessary CSS styles for the component
import "./Slider.css";

// Import configuration data for the slider
import { slidersItems } from "../../config";

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
              interval={item.delay}
            >
              <div className="d-flex justify-content-center align-items-center flex-column-mobile">
                <img src={item.image} alt={`${item.title} Image`} />
                <div>
                  <h3 className="slider-title">{item.title}</h3>
                  <p className="slider-text">{item.paragraph}</p>
                </div>
              </div>
            </Carousel.Item>
          ))
        : null}
    </Carousel>
  );
};

export default Slider;
