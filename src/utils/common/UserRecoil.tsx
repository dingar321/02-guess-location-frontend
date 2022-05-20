import { atom } from "recoil";
import User from "../types/User";

export const UserState = atom<User>({
    key: 'UserState',
    default: undefined
});