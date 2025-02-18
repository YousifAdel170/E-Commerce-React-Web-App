import { Col, Row } from "react-bootstrap";

import Multiselect from "multiselect-react-dropdown";

import ImageUploading from "react-images-uploading";

import { CompactPicker } from "react-color";

import add from "../../assets/Imgs/add.png";

import { ToastContainer } from "react-toastify";
import AdminAddProductHook from "../../hooks/products/AdminAddProductHook";

const AdminAddProduct = () => {
  const [
    onChange,
    maxNumber,
    onChangeDesName,
    onChangeQty,
    onChangeColor,
    onChangePriceAfter,
    onChangePriceBefor,
    onChangeProdName,
    showColor,
    category,
    brand,
    priceAfter,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handleChangeComplete,
    removeColor,
    onSelectCategory,
    handleSubmit,
    onSelectBrand,
    colors,
    priceBefore,
    qty,
    productDescription,
    productName,
  ] = AdminAddProductHook();
  return (
    <div>
      <Row className="justify-content-start ">
        {/* Title to add new product */}
        <div className="admin-content-text pb-4"> اضافه منتج جديد</div>

        <Col sm="8">
          {/* Title of product */}
          <div className="text-form pb-2"> صور للمنتج</div>

          {/* Image of Product */}
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            setImages={setImages}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  className="btn btn-primary"
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  انقر أو اسحب الصورة هنا
                </button>
                &nbsp;
                <button onClick={onImageRemoveAll} className="btn btn-danger">
                  إزالة جميع الصور
                </button>
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center my-2"
                    style={{ border: "1px solid blue", borderRadius: "8px" }}
                  >
                    <img src={image["data_url"]} alt="" width="100" />
                    <div className="">
                      <button
                        className="btn btn-primary me-4"
                        onClick={() => onImageUpdate(index)}
                      >
                        تحديث
                      </button>

                      <button
                        className="me-2 btn btn-danger"
                        onClick={() => onImageRemove(index)}
                      >
                        إزالة
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>

          {/* Input Name product */}
          <input
            type="text"
            className="input-form d-block mt-3 px-3"
            placeholder="اسم المنتج"
            onChange={onChangeProdName}
            value={productName}
          />

          {/* Input Description product */}
          <textarea
            className="input-form-area p-2 mt-3"
            rows="4"
            cols="50"
            placeholder="وصف المنتج"
            onChange={onChangeDesName}
            value={productDescription}
          />

          {/* Salary before coupon */}
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="السعر قبل الخصم"
            onChange={onChangePriceBefor}
            value={priceBefore}
          />

          {/* Price of product */}
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="السعر بعد الخصم"
            onChange={onChangePriceAfter}
            value={priceAfter}
          />

          {/* Quantity of product */}
          <input
            type="number"
            className="input-form d-block mt-3 px-3"
            placeholder="الكمية المتاحة "
            onChange={onChangeQty}
            value={qty}
          />

          {/* Select Main Category */}
          <select
            name="languages"
            id="lang"
            className="select input-form-area mt-3 px-2 "
            onChange={onSelectCategory}
          >
            <option value="0">اختر التصنيف الرئيسي</option>
            {category.data
              ? category.data.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
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
            onChange={onSelectBrand}
          >
            <option value="0">اختر الماركة</option>
            {brand.data
              ? brand.data.map((item) => {
                  return (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  );
                })
              : null}
          </select>

          {/* available colors for the product */}
          <div className="text-form mt-3 "> الالوان المتاحه للمنتج</div>

          <div className="mt-1 d-flex">
            {colors.length > 1
              ? colors.map((color, index) => (
                  <div
                    onClick={() => removeColor(color)}
                    key={index}
                    className="color ms-2 border  mt-1"
                    style={{ backgroundColor: `${color}` }}
                  ></div>
                ))
              : null}
            {/* Image display Add more color  */}
            <img
              src={add}
              alt=""
              width="30px"
              height="35px"
              className="ms-2"
              style={{ cursor: "pointer" }}
              onClick={onChangeColor}
            />
            {showColor ? (
              <CompactPicker onChangeComplete={handleChangeComplete} />
            ) : null}
          </div>
        </Col>
      </Row>

      {/* Button to save the modification */}
      <Row>
        <Col sm="8" className="d-flex justify-content-end ">
          <button className="btn-save d-inline mt-2" onClick={handleSubmit}>
            حفظ التعديلات
          </button>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
};

export default AdminAddProduct;
