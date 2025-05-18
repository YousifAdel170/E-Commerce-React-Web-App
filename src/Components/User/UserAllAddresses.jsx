// Import layout components from React Bootstrap
import { Col, Row } from "react-bootstrap";

// Import address card component
import UserAddressCard from "./UserAddressCard";

// Import Link for routing
import { Link } from "react-router-dom";

// Import custom hook to fetch all user addresses
import UserAllAddressesHook from "../../hooks/user/UserAllAddressesHook";

// Component to show all saved addresses of the user
const UserAllAddresses = () => {
  // Get all user addresses using custom hook
  const [addresses, handleDelete] = UserAllAddressesHook();

  return (
    <div>
      {/* Section Title */}
      <div className="admin-content-text pb-4">دفتر العنوانين</div>

      {/* Show addresses if available, otherwise show empty message */}
      {addresses ? (
        addresses.map((address, index) => (
          // Render address card
          <UserAddressCard
            key={index}
            address={address}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <h6>لا يوجد عنوانين حتى الان</h6>
      )}

      {/* Button to navigate to Add New Address Page */}
      <Row className="justify-content-center">
        <Col sm="5" className="d-flex justify-content-center">
          <Link
            to="/user/addresses/add-address"
            style={{ textDecoration: "none" }}
          >
            <button className="btn-add-address">اضافه عنوان جديد</button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

// Export the UserAllAddresses component
export default UserAllAddresses;
