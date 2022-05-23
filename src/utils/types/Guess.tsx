import { type } from "@testing-library/user-event/dist/type";
import { StringifyOptions } from "querystring";
import User from "./User";
import Location from "./Location";

type Guess = {
    errorDistanceKm: number,
    timePosted: string,
    userTk: User,
    locationTk: Location,
    guessId: number,
}

export default Guess;