import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AdminEditCategoryHook from "../../hooks/category/AdminEditCategoryHook";

const AdminEditCategory = () => {
  const { id } = useParams();
  const [
    categoryName,
    categoryImage,
    onChangeName,
    onChangeImage,
    handleSubmit,
  ] = AdminEditCategoryHook(id);

  return (
    <div>
      <Row className="justify-content-start">
        <div className="title-text pb-4">تعديل التصنيف</div>
        <Col sm="8">
          <div className="text-form pb-2 fw-bold">صوره التصنيف</div>
          <div>
            <div>
              <label htmlFor="upload-photo">
                <img
                  src={categoryImage}
                  alt="Upload Image"
                  height="100px"
                  width="120px"
                  style={{ cursor: "pointer" }}
                />
              </label>

              <input
                type="file"
                name="photo"
                onChange={onChangeImage}
                id="upload-photo"
              />
            </div>

            <input
              type="text"
              onChange={onChangeName}
              value={categoryName}
              className="input-form d-block mt-3 px-3"
              placeholder="اسم التصنيف"
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col sm="8" className="d-flex justify-content-end">
          <button onClick={handleSubmit} className="btn-save d-inline mt-2">
            حفظ التعديل
          </button>
        </Col>
      </Row>

      <ToastContainer />
    </div>
  );
};

export default AdminEditCategory;
