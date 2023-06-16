import { IProductItem } from "../admin/products/types";

export interface ICategoryItem {
  id: number;
  title: string;
  urlSlug: string;
  priority: number;
  image: string;
}

export interface IProductHomePage {
  products: Array<IProductItem>;
  pages: number;
  currentPage: number;
  total: number;
  categoryName: string;
}
