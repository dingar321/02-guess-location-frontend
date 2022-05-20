export function uppercaseString({ recievedString }: { recievedString: string }) {

    return recievedString.charAt(0).toUpperCase() + recievedString.slice(1);

}