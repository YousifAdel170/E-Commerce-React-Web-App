// Import the left navigation arrow image
import next from "../../Assets/Imgs/next.png";

// Custom left navigation button for the image gallery
const LeftButton = (onClick) => {
  return (
    <img
      src={next}
      alt="Left Arrow"
      width="35px"
      height="35px"
      onClick={onClick}
      style={{
        float: "left",
        marginTop: "220px",
        cursor: "pointer",
      }}
    />
  );
};

// Export the custom button component
export default LeftButton;
