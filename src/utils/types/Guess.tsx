import { type } from "@testing-library/user-event/dist/type";
import { StringifyOptions } from "querystring";
import User from "./User";

type Guess = {
    errorDistance: number,
    timePosted: string,
    userTk: User,
    locationTk: Location,
    guessId: number,
}

export default Guess;