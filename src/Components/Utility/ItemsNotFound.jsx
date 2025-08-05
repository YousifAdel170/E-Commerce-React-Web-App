/* eslint-disable react/prop-types */
// Component responsible for displaying the message when no items are found
const ItemsNotFound = ({ msg }) => {
  return (
    <div
      className="text-center w-100 py-4"
      role="alert"
      aria-live="polite"
      style={{ color: "var(--focus-color)" }}
    >
      <h4
        className="text-center w-100"
        role="note"
        aria-live="polite"
        style={{
          fontSize: "1.1rem",
          padding: "1rem",
        }}
      >
        {msg}
      </h4>
    </div>
  );
};

export default ItemsNotFound;
