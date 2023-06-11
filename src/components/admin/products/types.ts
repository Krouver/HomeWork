export interface IProductCreate {
  name: string;
  priority: number;
  categoryId: number;
  price: number;
  description: string;
  ids: number[];
}

export interface IProductCreateResult {
  id: number;
}

export interface ICategorySelect {
  id: number,
  urlSlug: string,
  title: string
}

export interface IProductItem {
  id: number;
  name: string;
  categoryName: string;
  priority: number;
  description: string;
  images: string[];
  price: number;
}
export interface IProductSearchResult {
  products: Array<IProductItem>, //IProductItem[]
  pages: number,
  currentPage: number,
  total: number,
  categoryName: string
}

export interface IProductSearch {
  page: number|string,
  name: string,
  price: string|number,
  categorySlug: string,
}
