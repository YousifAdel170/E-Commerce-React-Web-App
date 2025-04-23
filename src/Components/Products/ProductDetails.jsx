/* eslint-disable react/prop-types */

// Import Components from React Bootstrap
import { Col, Row } from "react-bootstrap";

// Import Custom Components
import ProductGallery from "./ProductGallery";
import ProductDescription from "./ProductDescription";

// Component responsible for displaying full product details layout
const ProductDetails = ({ itemProduct, itemCategory, itemBrand, images }) => {
  // console.log(itemProduct);
  return (
    <div className="pb-4">
      {/* Main layout row for product details */}
      <Row className="py-3 gap-mobile">
        {/* Left column: product images gallery */}
        <Col lg="4" className="gallery-container">
          <ProductGallery images={images} />
        </Col>

        {/* Right column: product description, category, and brand */}
        <Col lg="8">
          <ProductDescription
            itemProduct={itemProduct}
            itemCategory={itemCategory}
            itemBrand={itemBrand}
          />
        </Col>
      </Row>
    </div>
  );
};

// Export the component as default
export default ProductDetails;
