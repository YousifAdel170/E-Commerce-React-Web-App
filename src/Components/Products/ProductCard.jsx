/* eslint-disable react/prop-types */

// Import Components from React bootstrap, React Router DOM
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import Toastify for notifications
import { ToastContainer } from "react-toastify";

// Import  Assets
import rate from "../../Assets/Imgs/rate.png";

// Import Custom Components to display the product card
import ProductCardHook from "../../hooks/products/wishList/ProductCardHook";

// Import Custom CSS
import "./ProductCard.css";

// Component responsible for displaying a single product card
const ProductCard = ({ item, favoriteProducts }) => {
  // Custom Hook to handle the favorite products
  const [handleFav, favImage] = ProductCardHook(item, favoriteProducts);

  return (
    <Col xs="12" sm="6" md="4" lg="3" className="d-flex">
      {/* Card Component from React Bootstrap that contains The Image of the Product */}
      <Card
        style={{
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#fff",
          boxShadow: "0 2px 2px 0 rgba(151,151,151, 0.5)",
          marginBottom: "10px",
        }}
      >
        <Link to={`/products/${item?._id}`}>
          <Card.Img
            style={{ height: "228px", width: "100%" }}
            src={item?.imageCover}
          />
        </Link>

        <Card.Body>
          {/* Title of the Product */}
          <Card.Title className="d-flex justify-content-between">
            <div className="card-title">{item?.title}</div>
            {/* Favorite Button */}
            <img
              src={favImage}
              onClick={handleFav}
              alt="Favorite Button"
              className="text-center"
              style={{ height: "24px", width: "26px", cursor: "pointer" }}
            />
          </Card.Title>

          {/* Description of the Product */}
          <div className="card-text">
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                {/* Rate Image */}
                <img alt="Rate Image" src={rate} height="16px" width="16px" />
                <div className="card-rate mx-2">{item?.ratingsQuantity}</div>
              </div>

              {/* Price Of the Product */}
              <div className="d-flex">
                <div className="card-price">
                  {item?.priceAfterDiscount >= 1 ? (
                    <>
                      {item?.priceAfterDiscount}
                      <del className="mx-2 fs-6">{item?.price}</del>
                    </>
                  ) : (
                    item?.price
                  )}
                </div>
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
