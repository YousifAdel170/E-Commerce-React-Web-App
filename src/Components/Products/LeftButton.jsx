import next from "../../Assets/Imgs/next.png";

const LeftButton = (onClick) => {
  return (
    <img
      src={next}
      alt=""
      width="35px"
      onClick={onClick}
      height="35px"
      style={{ float: "left", marginTop: "220px", cursor: "pointer" }}
    />
  );
};

export default LeftButton;
