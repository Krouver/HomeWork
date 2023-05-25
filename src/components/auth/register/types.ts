export interface IRegisterPage {
    email: string;
    firstName: string;
    secondName: string;
    photo: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }

  export interface IRegisterError {
    email: string[],
    password: string[],
    confirmPassword: string[],
    photo: string[]
  }

  export interface ISelectItem {
    id: number;
    name: string;
  }