interface IProduct {
  id: number;
  name: string;
  priority: number;
  categoryId: number;
  description: string;
  ids: number[];
  price: number;
}

export default IProduct;