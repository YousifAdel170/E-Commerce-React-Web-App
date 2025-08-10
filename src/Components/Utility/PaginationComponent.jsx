/* eslint-disable react/prop-types */

// Import Pagintaion from React-Paginate
import ReactPaginate from "react-paginate";

// Import useTranslation from react-i18next for internationalization
import { useTranslation } from "react-i18next";

// Import Custom CSS for the Pagination Component
import "./PaginationComponent.css";

// Component Responsible for displaying the Pagination Component
const PaginationComponent = ({ pageCount, onPress }) => {
  // Function to handle the page click event
  const handlePageClick = (data) => onPress(data.selected + 1);

  const { t } = useTranslation("utilities");

  // Return the Pagination Component
  return (
    <ReactPaginate
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName={`page-link`}
      nextLabel={t("pagination.next")}
      nextClassName="page-item"
      nextLinkClassName={`page-link`}
      onPageChange={handlePageClick}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel={t("pagination.previous")}
      previousClassName="page-item"
      previousLinkClassName="page-link"
      renderOnZeroPageCount={null}
      containerClassName="pagination justify-content-center p-3"
      pageClassName="page-item"
      pageLinkClassName={`page-link`}
      activeClassName="active"
      //   forcePage={page - 1} // Explicitly set the active page
    />
  );
};

// Exporting the PaginationComponent Component
export default PaginationComponent;
