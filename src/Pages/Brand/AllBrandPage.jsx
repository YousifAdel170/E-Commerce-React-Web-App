// Import Components from react-bootstrap
import { Container } from "react-bootstrap";

// Import Custom Components
import SubTitle from "../../Components/Utility/SubTitle";
import PaginationComponent from "../../Components/Utility/PaginationComponent";
import BrandContainer from "../../Components/Brand/BrandContainer";

// Import Custom Hooks
import AllBrandPageHook from "../../hooks/brand/AllBrandPageHook"; // Custom hook to manage brand data

// Page Responsible to display all brands
const AllBrandPage = () => {
  // Use the custom hook to fetch brands data, loading status, page count, and page number handling function
  const [brands, loading, pageCount, getSelectedPageNumber] =
    AllBrandPageHook();

  return (
    <Container>
      {/* Title of the Page */}
      <SubTitle title="اشهر الماركات" />{" "}
      {/* Display subtitle "اشهر الماركات" */}
      {/* Container of Brand Items */}
      <BrandContainer brands={brands} loading={loading} />
      {/* Pass the brands data and loading status to the BrandContainer component */}
      {/* Pagination Component */}
      {pageCount > 1 ? (
        // If more than 1 page exists, render the pagination component
        <PaginationComponent
          pageCount={pageCount} // Pass the total page count to the PaginationComponent
          onPress={getSelectedPageNumber} // Pass the function to handle page number change
        />
      ) : null}
    </Container>
  );
};

export default AllBrandPage;
