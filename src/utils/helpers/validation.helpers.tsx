export function validateEmail({ email }: { email: string }) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    if (isEmailValid) {
        return true;
    } else if (!isEmailValid) {
        return false;
    }
}

export function validateFirstName({ firstName }: { firstName: string }) {
    const firstNameRegex = /^[a-zA-Z]{2,99}$/;
    const isFirstNameValid = firstNameRegex.test(firstName);

    if (isFirstNameValid) {
        return true;
    } else if (!isFirstNameValid) {
        return false;
    }
}

export function validateLastName({ lastName }: { lastName: string }) {
    const lastNameRegex = /^[a-zA-Z]{2,255}$/;
    const isLastNameValid = lastNameRegex.test(lastName);

    if (isLastNameValid) {
        return true;
    } else if (!isLastNameValid) {
        return false;
    }
}

export function validatePassword({ password }: { password: string }) {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,255}$/;
    const isPasswordValid = passwordRegex.test(password);

    if (isPasswordValid) {
        return true;
    } else if (!isPasswordValid) {
        return false;
    }
}

export function validatePasswordConfirm() {

}