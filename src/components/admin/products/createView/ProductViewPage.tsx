import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../../http_common";
import IProduct from "./types";
import { APP_ENV } from "../../../../env";
import parse from "html-react-parser";

const ProductViewPage = () => {
  type Image = {
    name: string;
  };
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct>({
    id: 0,
    name: "",
    priority: 0,
    categoryId: 0,
    description: "",
    images: [],
    price: 0,
  });
  console.log("Product id: " + productId);
  useEffect(() => {
    http.get<IProduct>(`api/products/get/${productId}`).then((resp) => {
      setProduct(resp.data);
      console.log("Product info", resp.data);
    });
  }, [productId]);

  return (
    <>
      <div className="container min-vh-100">
        <div className="row justify-content-center mt-3">
          <div className="col-md-6 col-lg-4">
            {product.images.map((img: Image | string) =>
              typeof img === "object" ? (
                <img
                  key={(img as Image).name}
                  src={`${APP_ENV.BASE_URL}images/300_${img.name}`}
                  alt={(img as Image).name}
                />
              ) : null
            )}
          </div>
          <div className="col-md-6 col-lg-4 border border-3 border-secondary p-3">
            <h1 className="text-center">{product.name}</h1>
            <hr />
            <h3 className="text-end">₴{product.price}</h3>
            <div></div>
            <div>
              <hr />
              <h6 className="">Інформація про товар</h6>
              <div>
                <hr />
                {parse(product.description)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductViewPage;
