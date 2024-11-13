export type ProfileAtomType = {
  id: string;
  name: string;
  email: string;
  gender: boolean;
  imageUrl?: string;
  bio?: string;
  numberOfFollowers: number;
  numberOfFollowing: number;
};

export interface IProfileResponse {
  statusCode: number;
  data: ProfileAtomType;
  message: string;
}
