import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import mobile from "../../assets/Imgs/mobile.png";
import deletion from "../../assets/Imgs/delete.png";

const AdminOrderItem = () => {
  return (
    <Col sm="12">
      <Link
        to={"/admin/all-orders/:id"}
        className="cart-item-body my-2 px-1 d-flex"
        style={{ textDecoration: "none" }}
      >
        {/* Order Item Image */}
        <img width="160px" height="197px" src={mobile} alt="" />

        {/* Order Item Container */}
        <div className="w-100">
          {/* Order Item Name and deletion to remove it */}
          <Row className="justify-content-between">
            <Col sm="12" className=" d-flex flex-row justify-content-between">
              <div className="d-inline pt-2 cat-text">طلب رقم #2321</div>
              <div className="d-flex pt-2 " style={{ cursor: "pointer" }}>
                <img src={deletion} alt="" width="20px" height="24px" />
                <div className="cat-text d-inline me-2">ازاله</div>
              </div>
            </Col>
          </Row>

          {/* Order Item description and rate */}
          <Row className="justify-content-center mt-2">
            <Col sm="12" className=" d-flex flex-row justify-content-start">
              <div className="d-inline pt-2 cat-title">
                آيفون XR بذاكرة سعة 128 جيجابايت ويدعم تقنية 4G LTE مع تطبيق فيس
                تايم (برودكت) أحمر
              </div>
              <div className="d-inline pt-2 cat-rate me-2">4.5</div>
            </Col>
          </Row>

          {/* Order Item brand & Color */}
          <Row>
            <Col sm="12" className=" d-flex">
              <div className="mt-2  cat-text d-inline">الماركة :</div>
              <div className="mt-1 barnd-text d-inline mx-1">ابل </div>
              <div
                className="color  me-1 border"
                style={{ backgroundColor: "#E52C2C" }}
              ></div>
            </Col>
          </Row>

          {/* Order Item Quantity and Price */}
          <Row className="justify-content-between">
            <Col sm="12" className=" d-flex flex-row justify-content-between">
              <div className="d-inline pt-2 d-flex">
                <div className="cat-text pt-1 d-inline">الكميه</div>
                <input
                  className="mx-2 mt-1"
                  type="number"
                  style={{ width: "40px", height: "25px" }}
                />
              </div>
              <div className="d-inline pt-2 barnd-text">٣٠٠٠ جنية</div>
            </Col>
          </Row>
        </div>
      </Link>
    </Col>
  );
};

export default AdminOrderItem;
