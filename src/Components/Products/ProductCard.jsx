/* eslint-disable react/prop-types */
import { Card, Col } from "react-bootstrap";
import rate from "../../Assets/Imgs/rate.png";
import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import ProductCardHook from "../../hooks/products/wishList/ProductCardHook";

const ProductCard = ({ item, favoriteProducts }) => {
  const [handleFav, favImage] = ProductCardHook(item, favoriteProducts);

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
        <Link to={`/products/${item._id}`} style={{ textDecoration: "none" }}>
          <Card.Img
            style={{ height: "228px", width: "100%" }}
            src={item.imageCover}
          />
        </Link>

        <Card.Body>
          <Card.Title className="d-flex justify-content-between">
            <div className="card-title">{item.title}</div>
            <img
              src={favImage}
              onClick={handleFav}
              alt="Favorite Button"
              className="text-center"
              style={{ height: "24px", width: "26px", cursor: "pointer" }}
            />
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
                <div className="card-rate mx-2">{item.ratingsQuantity}</div>
              </div>
              <div className="d-flex">
                <div className="card-price">{item.price}</div>
                <div className="card-currency mx-1">جنيه</div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Col>
  );
};

export default ProductCard;
