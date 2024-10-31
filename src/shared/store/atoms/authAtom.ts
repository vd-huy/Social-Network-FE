import { ATOM_KEYS } from "@/shared/constants/atomkeys.constant";
import { AuthAtomType } from "@/shared/types/auth.type";
import { atom } from "recoil";

// export const buildAuthAtom = (
//   isLoggedIn: boolean,
//   accessToken: string | undefined
// ): AuthAtomType => {
//   return {
//     isLoggedIn,
//     accessToken,
//   };
// };

export const authAtom = atom<AuthAtomType>({
  key: ATOM_KEYS.AUTH_ATOM, // Unique ID for the atom
  default: { isLoggedIn: false, accessToken: undefined }, // Default value
  effects: [
    ({ setSelf, onSet }) => {
      // Load initial state from either localStorage or sessionStorage
      if (typeof window !== "undefined") {
        const savedAuth =
          localStorage.getItem("authState") ||
          sessionStorage.getItem("authState");
        if (savedAuth) {
          setSelf(JSON.parse(savedAuth));
        }

        // Save to the appropriate storage when authAtom changes
        onSet((newAuth) => {
          if (localStorage.getItem("authState")) {
            localStorage.setItem("authState", JSON.stringify(newAuth));
          } else {
            sessionStorage.setItem("authState", JSON.stringify(newAuth));
          }
        });
      }
    },
  ],
});
