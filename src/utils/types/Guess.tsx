import { type } from "@testing-library/user-event/dist/type";
import { StringifyOptions } from "querystring";
import User from "./User";
import Location from "./Location";

type Guess = {
    errorDistanceKm: number,
    locationName: string,
    latitude: number,
    longitude: number,
    timePosted: string,
    userTk: User,
    locationTk: Location,
    guessId: number,
}

export default Guess;