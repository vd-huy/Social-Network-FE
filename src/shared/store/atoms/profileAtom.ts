import { ATOM_KEYS } from "@/shared/constants/atomkeys.constant";
import { ProfileAtomType } from "@/shared/types/profile.type";
import { atom } from "recoil";

export const profileAtom = atom<ProfileAtomType>({
  key: ATOM_KEYS.PROFILE_ATOM, // Unique ID for the atom
  default: {
    id: "",
    name: "",
    email: "",
    imageUrl: "",
    gender: false,
    bio: "",
    numberOfFollowers: 0,
    numberOfFollowing: 0,
  }, // Default value
});
