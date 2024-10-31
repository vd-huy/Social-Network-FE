export type AuthAtomType = {
  isLoggedIn: boolean;
  accessToken: string | undefined;
};

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  statusCode: number;
  data: { access_token: string };
  message: string;
}
