import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../../http_common";
import IProduct from "./types";
import { APP_ENV } from "../../../../env";

const ProductViewPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    http.get<IProduct>(`api/products/${productId}`).then((resp) => {
      setProduct(resp.data);
    });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-center">{product.name}</h1>
      <p>Priority: {product.priority}</p>
      <p>Category: {product.categoryId}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <div>
        <h3>Images:</h3>
        {product.ids.map((id) => (
          <img
            key={id}
            src={`${APP_ENV.BASE_URL}images/150_${id}`}
            alt={`Product Image ${id}`}
            style={{ width: "200px", height: "200px", margin: "10px" }}
          />
        ))}
      </div>
    </>
  );
};

export default ProductViewPage;
