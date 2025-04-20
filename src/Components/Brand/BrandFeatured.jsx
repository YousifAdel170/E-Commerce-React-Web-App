/* eslint-disable react/prop-types */

// Import Components from React Bootstrap
import { Container, Row, Spinner } from "react-bootstrap";

// Import Custom Components
import SubTitle from "../Utility/SubTitle";
import BrandCard from "./BrandCard";

// Import Custom Hooks
import HomeBrandHook from "../../hooks/brand/HomeBrandHook";

// Component responsible for displaying the featured brands on the home page
const BrandFeatured = ({ title, btnTitle }) => {
  // Custom Hook to fetch the brands data
  const [brands, loading] = HomeBrandHook();

  return (
    // Main Container for the Brand Featured Section
    <Container>
      {/* SubTitle Component to display the title and button */}
      <SubTitle title={title} btnTitle={btnTitle} path={"all-brands"} />

      {/* Row to display the brand cards */}
      <Row className="my-2 d-flex justify-content-between">
        {/* Check if loading is false and brands array has items */}
        {!loading ? (
          brands ? (
            brands.map((item) => (
              <BrandCard key={item._id} id={item._id} img={item.image} />
            ))
          ) : (
            <h4>لا يوجد ماركات</h4>
          )
        ) : (
          <Spinner className="mx-auto" animation="border" variant="dark" />
        )}
      </Row>
    </Container>
  );
};

// Export the BrandFeatured component for use in other components
export default BrandFeatured;
