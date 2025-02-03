import { Col, Row } from "react-bootstrap";

import Multiselect from "multiselect-react-dropdown";

import avatar from "../../assets/Imgs/avatar.png";
import add from "../../assets/Imgs/add.png";

const AdminAddProduct = () => {
  const onSelect = () => {};
  const onRemove = () => {};
  const options = [
    { name: "التصنيف الاول", id: 1 },
    { name: "التصنيف الثاني", id: 2 },
  ];
  return (
    <div>
      <Row className="justify-content-start ">
        {/* Title to add new product */}
        <div className="admin-content-text pb-4"> اضافه منتج جديد</div>

        <Col sm="8">
          {/* Title of product */}
          <div className="text-form pb-2"> صور للمنتج</div>

          {/* Image of Product */}
          <img src={avatar} alt="" height="100px" width="120px" />

          {/* Input Name product */}
          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم المنتج"
          />

          {/* Input Description product */}
          <textarea
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="وصف المنتج"
          />

          {/* Salary before coupon */}
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="السعر قبل الخصم"
          />

          {/* Price of product */}
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="سعر المنتج"
          />

          {/* Select Category */}
          <select
            name="languages"
            id="lang"
            className="select input-form-area mt-3 px-2 "
          >
            <option value="val">التصنيف الرئيسي</option>
            <option value="val">التصنيف الاول</option>
            <option value="val2">التصنيف الثاني</option>
            <option value="val2">التصنيف الثالث</option>
            <option value="val2">التصنيف الرابع</option>
          </select>

          {/* Multiselect (Subcategory) */}
          <Multiselect
            className="mt-2 text-end"
            placeholder="التصنيف الفرعي"
            options={options}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            style={{ color: "red" }}
          />

          {/* Select Brand */}
          <select
            name="brand"
            id="brand"
            className="select input-form-area mt-3 px-2 "
          >
            <option value="val">الماركة</option>
            <option value="val2">التصنيف الماركة الاولي</option>
            <option value="val2">التصنيف الماركة الثانيه</option>
            <option value="val2">التصنيف الرابع</option>
          </select>

          {/* available colors for the product */}
          <div className="text-form mt-3 "> الالوان المتاحه للمنتج</div>

          <div className="mt-1 d-flex">
            {/* Color 1 */}
            <div
              className="color ms-2 border  mt-1"
              style={{ backgroundColor: "#E52C2C" }}
            ></div>

            {/* Color 2 */}
            <div
              className="color ms-2 border mt-1 "
              style={{ backgroundColor: "white" }}
            ></div>

            {/* Color 3 */}
            <div
              className="color ms-2 border  mt-1"
              style={{ backgroundColor: "black" }}
            ></div>

            {/* Image display Add more color  */}
            <img src={add} alt="" width="30px" height="35px" className="" />
          </div>
        </Col>
      </Row>

      {/* Button to save the modification */}
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button className="btn-save d-inline mt-2 ">حفظ التعديلات</button>
        </Col>
      </Row>
    </div>
  );
};

export default AdminAddProduct;
