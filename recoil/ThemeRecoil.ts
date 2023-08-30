import { atom } from "recoil";

export const themeRecoil = atom({
  key: "theme", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});
