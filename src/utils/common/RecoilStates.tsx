import { atom } from "recoil";
import User from "../types/User";
import Location from "../types/Location";
import Guess from "../types/Guess";

//Logged users state
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

//Selected locations state
export const SelectedLocation = atom<Location>({
    key: 'SelectedLocation',
    default: {
        locationId: 0,
        locationName: '',
        latitude: 0,
        longitude: 0,
        timePosted: '',
        s3Imagekey: '',
        userTk: {
            userId: 0,
            email: '',
            firstName: '',
            lastName: '',
            timeRegistered: '',
            s3Imagekey: '',
            guesses: [],
        },
    },
});

export const SelectedLocationsBestGuesses = atom<Guess[]>({
    key: 'SelectedLocationsBestGuesses',
    default: [],
});

export const UserGuesses = atom<number[]>({
    key: 'UserGuesses',
    default: [],
});


export const MostRecentLocationsHome = atom<Location[]>({
    key: 'MostRecentLocationsHome',
    default: [],
});


export const MostRecentLocationsLogged = atom<Location[]>({
    key: 'MostRecentLocationsLogged',
    default: [],
});

export const PersonalBestGuessesLogged = atom<Guess[]>({
    key: 'PersonalBestGuessesLogged',
    default: [],
});

export const AlreadyGuessed = atom<boolean>({
    key: 'AlreadyGuessed',
    default: false,
});