import { type } from "@testing-library/user-event/dist/type";
import { StringifyOptions } from "querystring";
import User from "./User";

type Location = {
    locationId: number,
    locationName: string,
    latitude: number,
    longitude: number,
    timePosted: string,
    s3Imagekey: string,
    userTk: User
}

export default Location;