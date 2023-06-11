export interface IProductImage {
  id: number;
  name: string;
}
interface IProduct {
  id: number;
  name: string;
  priority: number;
  categoryId: number;
  description: string;
  images: IProductImage[];
  price: number;
}

export default IProduct;