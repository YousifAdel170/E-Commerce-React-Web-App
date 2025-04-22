// Import the right navigation arrow image
import prev from "../../Assets/Imgs/prev.png";

// Custom right navigation button for the image gallery
const RightButton = (onClick) => {
  return (
    <img
      src={prev}
      alt="Right Arrow"
      width="35px"
      height="35px"
      onClick={onClick}
      style={{
        float: "right",
        marginTop: "220px",
        cursor: "pointer",
      }}
    />
  );
};

// Export the custom button component
export default RightButton;
