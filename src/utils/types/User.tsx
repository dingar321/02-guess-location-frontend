import { type } from "@testing-library/user-event/dist/type";

type User = {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    timeRegistered: string;
    s3Imagekey: string;
    guesses: number[]
}

export default User;