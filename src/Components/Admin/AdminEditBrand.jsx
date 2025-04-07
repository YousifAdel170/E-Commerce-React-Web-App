import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import AdminEditBrandHook from "../../hooks/brand/AdminEditBrandHook";

const AdminEditBrand = () => {
  const { id } = useParams();
  const [brandName, brandImage, onChangeName, onChangeImage, handleSubmit] =
    AdminEditBrandHook(id);

  return (
    <div>
      <Row className="justify-content-start">
        <div className="admin-content-text pb-4">تعديل الماركة</div>
        <Col sm="8">
          <div className="text-form pb-2 fw-bold">صوره الماركة</div>
          <div>
            <div>
              <label htmlFor="upload-photo">
                <img
                  src={brandImage}
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
              value={brandName}
              className="input-form d-block mt-3 px-3"
              placeholder="اسم الماركة"
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

export default AdminEditBrand;
