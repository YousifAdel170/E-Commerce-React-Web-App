// Import Components from React Bootstrap
import { Container } from "react-bootstrap";

// Import to get the product ID from URL parameters
import { useParams } from "react-router-dom";

// Import Custom Components
import CategoryHeader from "../../Components/Category/CategoryHeader";
import ProductDetails from "../../Components/Products/ProductDetails";
import RateContainer from "../../Components/Rate/RateContainer";
import ProductCardContainer from "../../Components/Products/ProductCardContainer";

// Import the custom hook to fetch product details data
import ViewProductDetailsHook from "../../hooks/products/ViewProductDetailsHook";

// Import constants
import { PRODUCT_YOU_COULD_LIKE_TITLE } from "../../constants/titles";
// Page responsible for displaying the details of the product
const ProductDetailsPage = () => {
  // Get the product ID from the URL
  const { id } = useParams();

  // Use the custom hook to get product details and related data
  const [itemProduct, images, itemCategory, itemBrand, prodouctsLikeSample] =
    ViewProductDetailsHook(id);

  return (
    <div style={{ flex: "1" }}>
      {/* Category Header Section */}
      <CategoryHeader />

      {/* Page content container */}
      <Container>
        {/* Display product details including images, category, and brand */}
        <ProductDetails
          itemProduct={itemProduct}
          itemCategory={itemCategory}
          itemBrand={itemBrand}
          images={images}
        />

        {/* Display the rating average and number of ratings */}
        <RateContainer
          itemRatingAverage={itemProduct?.ratingsAverage}
          itemRatingQty={itemProduct?.ratingsQuantity}
        />

        {/* Display similar products that the user may like */}
        <ProductCardContainer
          products={prodouctsLikeSample}
          title={PRODUCT_YOU_COULD_LIKE_TITLE}
        />
      </Container>
    </div>
  );
};

// Export the component as default
export default ProductDetailsPage;
