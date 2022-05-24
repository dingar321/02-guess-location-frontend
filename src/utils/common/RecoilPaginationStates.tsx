import { atom } from "recoil";
import User from "../types/User";
import Location from "../types/Location";
import Guess from "../types/Guess";
import Pin from "../types/Pin";

export const PaginateNumberLocations = atom<number>({
    key: 'PaginateNumberLocations',
    default: 6,
});

export const PaginateNumberBestGuesses = atom<number>({
    key: 'PaginateNumberBestGuesses',
    default: 6,
});