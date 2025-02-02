import { useState } from "react";
import { Carousel } from "react-bootstrap";
import SliderOneImage from "../../Assets/Imgs/slider4.png";
import SliderTwoImage from "../../Assets/Imgs/slider1.png";
import SliderThreeImage from "../../Assets/Imgs/prod3.png";
import SliderFourImage from "../../Assets/Imgs/prod4.png";

const Slider = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item className="slider-background" interval={2000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
            style={{ height: "296px", width: "313.53px" }}
            className=""
            src={SliderOneImage}
            alt="First slide Img"
          />
          <div className="">
            <h3 className="slider-title">هناك خصم كبير</h3>
            <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item className="slider-background2" interval={2000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
            style={{ height: "296px", width: "313.53px" }}
            className=""
            src={SliderTwoImage}
            alt="Second slide Img"
          />
          <div className="">
            <h3 className="slider-title">هناك خصم كبير</h3>
            <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item className="slider-background3" interval={2000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
            style={{ height: "296px", width: "373.53px" }}
            className=""
            src={SliderThreeImage}
            alt="Third slide Img"
          />
          <div className="">
            <h3 className="slider-title">هناك خصم كبير</h3>
            <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
          </div>
        </div>
      </Carousel.Item>

      <Carousel.Item className="slider-background4" interval={2000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img
            style={{ height: "296px", width: "373.53px" }}
            className=""
            src={SliderFourImage}
            alt="Fourth slide Img"
          />
          <div className="">
            <h3 className="slider-title">هناك خصم كبير</h3>
            <p className="slider-text">خصم يصل ٥٠٪ عند شرائك</p>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
