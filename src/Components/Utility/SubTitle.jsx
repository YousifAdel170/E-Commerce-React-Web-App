import { Link } from "react-router-dom";

const SubTitle = ({ title, btnTitle, path }) => {
  return (
    <div className="d-flex justify-content-between pt-4">
      <div className="sub-title">{title}</div>
      <Link to={`${path}`} style={{ textDecoration: "none" }}>
        {btnTitle ? <div className="shopping-now">{btnTitle}</div> : null}
      </Link>
    </div>
  );
};

export default SubTitle;
