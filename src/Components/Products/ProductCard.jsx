import { Card, Col } from "react-bootstrap";
import product from "../../Assets/Imgs/prod1.png";
import favoff from "../../Assets/Imgs/fav-off.png";
import rate from "../../Assets/Imgs/rate.png";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <Col xs="12" sm="6" md="4" lg="3" className="d-flex">
      <Card
        style={{
          width: "100%",
          minHeight: "345px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#fff",
          boxShadow: "0 2px 2px 0 rgba(151,151,151, 0.5)",
          marginBottom: "10px",
        }}
      >
        <Link to="/products/:id" style={{ textDecoration: "none" }}>
          <Card.Img style={{ height: "228px", width: "100%" }} src={product} />
        </Link>

        <div className="d-flex justify-content-end mx-2">
          <img
            src={favoff}
            alt="Favorite Off"
            className="text-center"
            style={{ height: "24px", width: "26px" }}
          />
        </div>
        <Card.Body>
          <Card.Title>
            <div className="card-title">
              سود كربون ساعة يد ذكية بيب اس اسود كربون
            </div>
          </Card.Title>
          <div className="card-text">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <img
                  className=""
                  alt=""
                  src={rate}
                  height="16px"
                  width="16px"
                />
                <div className="card-rate mx-2">4.5</div>
              </div>
              <div className="d-flex">
                <div className="card-price">880</div>
                <div className="card-currency mx-1">جنيه</div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
