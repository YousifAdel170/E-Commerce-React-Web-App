import { Col, Row } from "react-bootstrap";
import ProductGallery from "./ProductGallery";
import ProductDescription from "./ProductDescription";
import { useParams } from "react-router-dom";
import ViewProductDetailsHook from "../../hooks/products/ViewProductDetailsHook";

const ProductDetails = () => {
  const { id } = useParams();

  const [itemProduct, images, itemCategory, itemBrand] =
    ViewProductDetailsHook(id);

  return (
    <div>
      <Row className="py-3">
        <Col lg="4">
          <ProductGallery images={images} />
        </Col>
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

export default ProductDetails;
