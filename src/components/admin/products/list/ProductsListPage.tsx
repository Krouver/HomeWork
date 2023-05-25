import { Link } from "react-router-dom";

const ProductsListPage = () => {
    return (
      <>
        <h1 className="text-center">Продукти</h1>
        <Link to="/admin/products/create" className="btn btn-success">Додати</Link>
      </>
    );
}
export default ProductsListPage;