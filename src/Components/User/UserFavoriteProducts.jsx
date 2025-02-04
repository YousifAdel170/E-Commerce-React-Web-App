import { Row } from "react-bootstrap";
import ProductCard from "../Products/ProductCard";
import PaginationComponent from "../Utility/PaginationComponent";

const UserFavoriteProducts = () => {
  return (
    <div>
      <div className="admin-content-text pb-4">قائمة المفضلة</div>
      <Row>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Row>
      <PaginationComponent />
    </div>
  );
};

export default UserFavoriteProducts;
