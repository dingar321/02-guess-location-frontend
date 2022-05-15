import { type } from "@testing-library/user-event/dist/type";

type User = {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    timeRegistered: string;
    s3ImageKey: string;
    upvotes: number[]
}

export default User;