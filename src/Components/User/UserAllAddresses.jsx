import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserAddressCard from "./UserAddressCard";

const UserAllAddresses = () => {
  return (
    <div>
      <div className="admin-content-text pb-4">دفتر العنوانين</div>

      <UserAddressCard />
      <UserAddressCard />
      <UserAddressCard />

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

export default UserAllAddresses;
