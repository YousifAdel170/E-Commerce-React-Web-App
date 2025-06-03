/* eslint-disable react/prop-types */

// Import components from react-bootstrap and react-router-dom
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import custom modal component, star rating component to display product ratings
import ModalComponent from "../Utility/ModalComponent";
import { StarRating } from "../Utility/StartRating";

// Import custom hook for admin product card logic
import AdminProductCardHook from "../../hooks/admin/AdminProductCardHook";
import useInviewAnimation from "../../hooks/Utility/useInviewAnimation";

// Import modal message data for delete and edit operations
import { deleteModal, editModal } from "../../data/utilities/modalMessages";

// Component responsible for rendering individual product cards in admin panel
const AdminProductCard = ({ item, onDelete, index }) => {
  // Destructure modal visibility and handlers from custom hook
  const [
    showDelete,
    showEdit,
    handleCloseDelete,
    handleCloseEdit,
    handleDelete,
    handleEdit,
    actions,
    discountAmount,
    discountPercent,
  ] = AdminProductCardHook(item, onDelete);

  const [sectionRef, isVisible] = useInviewAnimation();

  return (
    <Col xs="12" sm="6" md="5" lg="4">
      {/* Delete Confirmation Modal */}
      <ModalComponent
        show={showDelete}
        handleClose={handleCloseDelete}
        handleOperation={handleDelete}
        modalTitle={deleteModal.modalTitle}
        modalBody={deleteModal.modalBody}
        modalFooter={deleteModal.modalFooter}
        className={deleteModal.className}
        ariaLabel={`Delete product ${item?.title}`}
      />

      {/* Edit Product Modal */}
      <ModalComponent
        show={showEdit}
        handleClose={handleCloseEdit}
        handleOperation={handleEdit}
        modalTitle={editModal.modalTitle}
        modalBody={editModal.modalBody}
        modalFooter={editModal.modalFooter}
        className={editModal.className}
        ariaLabel={`Edit product ${item?.title}`}
      />

      {/* Main Product Card */}
      <Card
        className={`my-2 product-card ${isVisible ? "fade-in" : ""}`}
        tabIndex={0}
        aria-labelledby={`product-title-${item?._id}`}
        role="group"
        style={{
          animationDelay: `${index * 0.1}s`,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        }}
        ref={sectionRef}
      >
        {/* Action buttons for Edit/Delete */}
        <Col className="d-flex justify-content-between px-3 pt-3">
          {actions.map((action, index) => (
            <button
              key={index}
              type="button"
              onClick={action.onClick}
              aria-label={action.label}
              className="action-btn"
            >
              {action?.label}
            </button>
          ))}
        </Col>

        {/* Product details link */}
        <Link
          to={`/products/${item?._id}`}
          className="product-link"
          aria-describedby={`product-desc-${item?._id}`}
        >
          <div className="image-container" aria-hidden="true">
            {/* Discount badge shown if discount exists */}
            {(discountPercent > 0 || discountAmount > 0) && (
              <span
                className="discount-badge"
                aria-label={`خصم ${
                  discountPercent
                    ? discountPercent + "%"
                    : discountAmount + " جنيه"
                }`}
                role="note"
                tabIndex={-1}
              >
                {discountPercent
                  ? ` ${discountPercent}%`
                  : `خصم ${discountAmount} جنيه`}
              </span>
            )}

            {/* Product image with fallback on error */}
            <Card.Img
              src={item?.imageCover}
              alt={`Image of ${item?.title}`}
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback-image.png";
              }}
            />
          </div>

          {/* Product title, rating, and price */}
          <Card.Body className="d-flex flex-column justify-content-between px-3 pb-3 w-100">
            <Card.Title
              id={`product-title-${item?._id}`}
              className="product-title d-flex justify-content-between align-items-center w-100"
            >
              {item?.title}
            </Card.Title>

            <div
              id={`product-desc-${item?._id}`}
              className="d-flex align-items-center justify-content-between w-100"
            >
              {/* Display rating stars */}
              <StarRating rating={item?.ratingsAverage || 0} />

              {/* Show price with discount if available */}
              <div className="price-container">
                {item?.priceAfterDiscount ? (
                  <>
                    <span className="price-discounted">
                      {item?.priceAfterDiscount} جنيه
                    </span>
                    <del aria-label={`Original price ${item?.price} جنيه`}>
                      {item?.price} جنيه
                    </del>
                  </>
                ) : (
                  <span>{item?.price} جنيه</span>
                )}
              </div>
            </div>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
};

// Exporting AdminProductCard component
export default AdminProductCard;
