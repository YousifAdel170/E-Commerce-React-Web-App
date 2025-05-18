import { Col, Container, Row } from "react-bootstrap";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import AdminAllProducts from "../../Components/Admin/AdminAllProducts";
import PaginationComponent from "../../Components/Utility/PaginationComponent";
import AdminAllProductsPageHook from "../../hooks/admin/AdminAllProductsPageHook";
import { ToastContainer } from "react-toastify";

const AdminAllProductsPage = () => {
  const [items, pageCount, onPress, onDelete, onEdit] =
    AdminAllProductsPageHook();

  return (
    <Container>
      <Row className="py-3">
        <Col sm="3" xs="2" md="2">
          <AdminSideBar />
        </Col>

        <Col sm="9" xs="10" md="10">
          <AdminAllProducts items={items} onDelete={onDelete} onEdit={onEdit} />
          {pageCount > 1 ? (
            <PaginationComponent pageCount={pageCount} onPress={onPress} />
          ) : null}
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default AdminAllProductsPage;
