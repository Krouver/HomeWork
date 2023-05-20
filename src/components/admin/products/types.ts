import { NumberSchema } from "yup";

export interface IProductCreate {
  name: string;
  priority: number;
  categoryId: number;
  price: number;
  description: string;
  ids: number[];
}

export interface ICategorySelect {
  id: number,
  title: string
}
