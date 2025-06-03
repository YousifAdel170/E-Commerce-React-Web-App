// Import components from React Bootstrap
import { Row } from "react-bootstrap";

// Import custom components
import AdminProductCard from "./AdminProductCard";
import PaginationComponent from "../Utility/PaginationComponent";

// Import custom hooks
import AdminAllProductsPageHook from "../../hooks/admin/AdminAllProductsPageHook";

// Import Constant data
import { adminData } from "../../data/admin/adminData";

// Component responsible for rendering all products in the admin panel
const AdminAllProducts = () => {
  // Custom hook to manage state and logic for the component
  const [items, pageCount, onPress, onDelete] = AdminAllProductsPageHook();

  return (
    <div>
      {/* Title of the section */}
      <div className="title-text">{adminData.allProducts.title}</div>

      <Row>
        {/* Map through the items and render AdminProductCard for each item */}
        {items?.length ? (
          items.map((item, index) => (
            <AdminProductCard
              key={item?._id}
              item={item}
              onDelete={onDelete}
              index={index}
            />
          ))
        ) : (
          <h4>{adminData.allProducts.notFound}</h4>
        )}
      </Row>

      {/* Pagination component to navigate through pages */}
      {pageCount > 1 ? (
        <PaginationComponent pageCount={pageCount} onPress={onPress} />
      ) : null}
    </div>
  );
};

export default AdminAllProducts;
