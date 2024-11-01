export type AuthAtomType = {
  isLoggedIn: boolean;
  accessToken: string | undefined;
  remember: boolean;
};

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  statusCode: number;
  data: { access_token: string };
  message: string;
}
