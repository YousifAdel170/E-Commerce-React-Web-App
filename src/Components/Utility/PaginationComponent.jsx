/* eslint-disable react/prop-types */
import ReactPaginate from "react-paginate";

// const PaginationComponent = ({ pageCount }) => {
const PaginationComponent = ({ pageCount, onPress }) => {
  // Get The Clicked Page
  const handlePageClick = (data) => {
    onPress(data.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName={`page-link`}
      nextLabel="التالي"
      nextClassName="page-item"
      nextLinkClassName={`page-link`}
      onPageChange={handlePageClick}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      previousLabel="السابق"
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

export default PaginationComponent;
