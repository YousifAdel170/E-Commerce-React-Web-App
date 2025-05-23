/* eslint-disable react/prop-types */

// Import Components from React Bootstrap
import { Col, Row, Container } from "react-bootstrap";
import { motion } from "framer-motion";

// Import Custom Components
import ProductGallery from "./ProductGallery";
import ProductDescription from "./ProductDescription";

// Component responsible for displaying full product details layout
const ProductDetails = ({ itemProduct, itemCategory, itemBrand, images }) => {
  // Loading fallback (optional)
  if (!itemProduct || !images) return <h5>جاري التحميل...</h5>;

  return (
    <Container className="py-5">
      {/* Main layout row for product details */}
      <Row className="gap-4 gap-lg-0 align-items-start">
        {/* Left column: product images gallery */}
        <Col xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ProductGallery images={images} />
          </motion.div>
        </Col>

        {/* Right column: product description, category, and brand */}
        <Col xs={12} lg={8}>
          <div className="product-description-wrapper">
            <motion.div
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
