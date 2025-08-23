/* eslint-disable react/prop-types */

// Import Components from React Bootstrap
import { Col, Row, Container } from "react-bootstrap";
import { motion } from "framer-motion";

// Import Custom Components
import ProductGallery from "./ProductGallery";
import ProductDescription from "./ProductDescription";
import SpinnerComponent from "../Utility/SpinnerComponent";

// Component responsible for displaying full product details layout
const ProductDetails = ({ itemProduct, itemCategory, itemBrand, images }) => {
  // If it still loading
  if (!itemProduct || !images)
    return (
      <Container className="py-5 text-center">
        <SpinnerComponent />
      </Container>
    );

  return (
    <Container className="py-3">
      <Row className="align-items-stretch" style={{ minHeight: "100%" }}>
        {/* Left column: product images gallery */}
        <Col xs={12} lg={4} className="mb-4 mb-lg-0">
          <motion.div
            className="w-100 h-100"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-100 h-100">
              {!images ? (
                <Container className="d-flex align-items-center justifiy-content-center h-100 ">
                  <SpinnerComponent />
                </Container>
              ) : (
                <ProductGallery images={images} />
              )}
            </div>
          </motion.div>
        </Col>

        {/* Right column: product description */}
        <Col xs={12} lg={8} className="d-flex">
          <motion.div
            className="w-100 h-100 d-flex"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <ProductDescription
              itemProduct={itemProduct}
              itemCategory={itemCategory}
              itemBrand={itemBrand}
            />
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
