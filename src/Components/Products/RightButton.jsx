import prev from "../../Assets/Imgs/prev.png";

const RightButton = (onClick) => {
  return (
    <img
      src={prev}
      alt=""
      width="35px"
      onClick={onClick}
      height="35px"
      style={{ float: "right", marginTop: "220px", cursor: "pointer" }}
    />
  );
};

export default RightButton;
