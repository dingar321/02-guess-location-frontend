import { atom } from "recoil";
import User from "../types/User";

export const UserState = atom<User>({
    key: 'UserState',
    default: {
        userId: 0,
        email: '',
        firstName: '',
        lastName: '',
        timeRegistered: '',
        s3Imagekey: '',
        guesses: [],
    },
});