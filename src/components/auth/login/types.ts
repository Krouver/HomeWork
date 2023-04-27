export interface ILoginPage {
  email: string;
  password: string;
}

export interface ILoginPageError {
  email: string[];
  password: string[];
  invalid: string[];
}
