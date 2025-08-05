// Import hooks from react and react-i18next
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Impot Components from React Bootstrap
import { Carousel } from "react-bootstrap";

// Import data for the slider items and delay constant
import { slidersItems } from "../../data/utilities/slidersItems";
import { DELAYS } from "../../constants/delays";

// Import necessary CSS styles for the component
import "./Slider.css";

// Component Responsible for rendering the slider
const Slider = () => {
  // Using the useTranslation hook to access translation functions
  const { t } = useTranslation("home");

  // State to manage the active index of the carousel
  const [index, setIndex] = useState(0);

  // Function to handle the selection of a carousel item
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
              interval={DELAYS.SLIDER}
            >
              <div className="d-flex justify-content-center align-items-center flex-column-mobile">
                <img src={item.image} alt={`${t("homeSliderTitle")} Image`} />
                <div>
                  <h3 className="slider-title">{t("homeSliderTitle")}</h3>
                  <p className="slider-text">{t("homeSliderParagraph")}</p>
                </div>
              </div>
            </Carousel.Item>
          ))
        : null}
    </Carousel>
  );
};

export default Slider;
