import { Col, Row } from "react-bootstrap";

import deleteIcon from "../../assets/Imgs/delete.png";

const UserProfile = () => {
  return (
    <div>
      {/* Title of the User Profile */}
      <div className="admin-content-text">الصفحه الشخصية</div>

      <div className="user-address-card my-3 px-2">
        {/* Name & edit and delete */}
        <Row className="d-flex justify-content-between pt-2">
          {/* Name  */}
          <Col xs="6" className="d-flex">
            <div className="p-2">الاسم:</div>
            <div className="p-1 item-delete-edit">احمد عبداللة</div>
          </Col>

          {/* Edit & Delete */}
          <Col xs="6" className="d-flex justify-content-end">
            <div className="d-flex mx-2">
              <img
                alt=""
                className="ms-1 mt-2"
                src={deleteIcon}
                height="17px"
                width="15px"
              />
              <p className="item-delete-edit"> تعديل</p>
            </div>
          </Col>
        </Row>

        {/* Phone number */}
        <Row className="">
          <Col xs="12" className="d-flex">
            <div className="p-2">رقم الهاتف:</div>
            <div className="p-1 item-delete-edit">0122314324</div>
          </Col>
        </Row>

        {/* Email */}
        <Row className="">
          <Col xs="12" className="d-flex">
            <div className="p-2">الايميل:</div>
            <div className="p-1 item-delete-edit">ahmed@gmail.com</div>
          </Col>
        </Row>

        {/* Change the Password */}
        <Row className="mt-5">
          <Col xs="10" sm="8" md="6" className="">
            {/* Title of change  */}
            <div className="admin-content-text">تغير كملة المرور</div>

            <input
              type="password"
              className="input-form d-block mt-1 px-3"
              placeholder="ادخل كلمة المرور القديمة"
            />
            <input
              type="password"
              className="input-form d-block mt-3 px-3"
              placeholder="ادخل كلمة المرور الجديده"
            />
          </Col>
        </Row>

        {/* Submit Button to Save the Password */}
        <Row>
          <Col xs="10" sm="8" md="6" className="d-flex justify-content-end ">
            <button className="btn-save d-inline mt-2 ">حفظ كلمة السر</button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserProfile;
