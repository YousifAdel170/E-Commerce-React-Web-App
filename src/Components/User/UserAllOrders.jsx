import { Row } from "react-bootstrap";
import UserOrderItem from "./UserOrderItem";

const UserAllOrders = () => {
  return (
    <div>
      <div className="admin-content-text pb-4">اهلا محمد على</div>
      <Row className="justify-content-between">
        <UserOrderItem />
        <UserOrderItem />
        <UserOrderItem />
      </Row>
    </div>
  );
};

export default UserAllOrders;
