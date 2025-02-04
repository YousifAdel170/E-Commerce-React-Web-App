import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import deleteIcon from "../../assets/Imgs/delete.png";

const UserAddressCard = () => {
  return (
    <div className="user-address-card my-3 px-2">
      <Row className="d-flex justify-content-between">
        {/* Home */}
        <Col xs="1">
          <div className="p-2">المنزل</div>
        </Col>

        <Col xs="4" className="d-flex d-flex justify-content-end">
          <div className="d-flex p-2">
            <div className="d-flex mx-2">
              {/* Delete Address */}
              <img
                alt=""
                className="ms-1 mt-2"
                src={deleteIcon}
                height="17px"
                width="15px"
              />

              {/* Edit Address */}
              <Link
                to="/user/addresses/edit-address"
                style={{ textDecoration: "none" }}
              >
                <p className="item-delete-edit"> تعديل</p>
              </Link>
            </div>
          </div>
        </Col>
      </Row>

      {/* Address Value */}
      <Row>
        <Col xs="12">
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "14px",
            }}
          >
            القاهرة مدينه نصر شارع التسعين عماره ١٤
          </div>
        </Col>
      </Row>

      {/* Phone */}
      <Row className="mt-3">
        <Col xs="12" className="d-flex">
          {/* Phone Title */}
          <div
            style={{
              color: "#555550",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
          >
            رقم الهاتف:
          </div>

          {/* Phone Value */}
          <div
            style={{
              color: "#979797",
              fontFamily: "Almarai",
              fontSize: "16px",
            }}
            className="mx-2"
          >
            0021313432423
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserAddressCard;
