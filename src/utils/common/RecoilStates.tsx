import { atom } from "recoil";
import User from "../types/User";
import Location from "../types/Location";
import Guess from "../types/Guess";
import Pin from "../types/Pin";

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


export const OriginalCoordinates = atom<Pin>({
    key: 'OriginalCoordinates',
    default: {
        lat: 0.000000,
        lng: 0.000000
    },
});

export const GuessedCoordinates = atom<Pin>({
    key: 'GuessedCoordinates',
    default: {
        lat: 0.000000,
        lng: 0.000000
    },
});

export const SelectedLocationUsersGuess = atom<Guess>({
    key: 'SelectedLocationUsersGuess',
    default: {
        errorDistanceKm: 0,
        locationName: '',
        latitude: 0,
        longitude: 0,
        timePosted: '',
        userTk: {
            userId: 0,
            email: '',
            firstName: '',
            lastName: '',
            timeRegistered: '',
            s3Imagekey: '',
            guesses: [],
        },
        locationTk: {
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
        guessId: 0,
    }
})


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