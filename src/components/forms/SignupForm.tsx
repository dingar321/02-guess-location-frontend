import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { validateEmail, validateFirstName, validateLastName, validatePassword } from '../../utils/helpers/validation.helpers';
import ContainedButton from '../buttons/ContainedButton';
import TextButton from '../buttons/TextButton';
import PasswordTextField from './inputs/PasswordTextField';
import RegularTextField from './inputs/RegularTextField';
import ProfileImageUpload from './upload/ProfileImageUpload';
import ImageUpload from './upload/ProfileImageUpload';


const SignupForm = () => {
    //navigation between pages
    const navigate = useNavigate();

    //Error handling
    const [errorMessage, setErrorMessage] = useState<string>('');
    const errorRef = React.useRef<HTMLInputElement | null>(null)

    //Values provided by the user
    const [image, setImage] = useState<File>()
    const [imagePath, setImagePath] = useState<string>('')
    const [imageUploaded, setImageUpoaded] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    //Empt error message when changing values form from
    useEffect(() => {
        setErrorMessage('');
    }, [email, firstName, lastName, password, passwordConfirm])

    //Validation information used to verify inputs
    //email
    const [emailBlurred, setEmailBlurred] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');
    //First name
    const [firstNameBlurred, setFirstNameBlurred] = useState<boolean>(false);
    const [firstNameError, setFirstNameError] = useState<boolean>(false);
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState<string>('');
    //Last name
    const [lastNameBlurred, setLastNameBlurred] = useState<boolean>(false);
    const [lastNameError, setLastNameError] = useState<boolean>(false);
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState<string>('');
    //Password
    const [passwordBlurred, setPasswordBlurred] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>('');
    const [passwordValid, setPasswordValid] = useState<boolean>(false);
    //PasswordConfirm
    const [passwordConfirmBlurred, setPasswordConfirmBlurred] = useState<boolean>(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState<boolean>(false);
    const [passwordConfirmErrorMsg, setPasswordConfirmErrorMsg] = useState<string>('');



    //Check if email the email is valid
    useEffect(() => {
        if (emailBlurred) {
            setEmailBlurred(false);
            if (email.length !== 0) {

                const validEmail = validateEmail({ email: email });

                if (!validEmail) {
                    setEmailError(true);
                    setEmailErrorMsg('Email is invalid');
                }
                if (validEmail) {
                    setEmailError(false);
                    setEmailErrorMsg('');
                }
            }
        }
    }, [emailBlurred])

    //Check if email the email is valid
    useEffect(() => {
        if (firstNameBlurred) {
            setFirstNameBlurred(false);
            if (firstName.length !== 0) {

                const validFirstName = validateFirstName({ firstName: firstName })

                if (!validFirstName) {
                    setFirstNameError(true);
                    setFirstNameErrorMsg('First name is invalid');
                }
                if (validFirstName) {
                    setFirstNameError(false);
                    setFirstNameErrorMsg('');
                }
            }
        }
    }, [firstNameBlurred])

    //Check if email the email is valid
    useEffect(() => {

        if (lastNameBlurred) {
            setLastNameBlurred(false);
            if (lastName.length !== 0) {

                const validLastName = validateLastName({ lastName: firstName })

                if (!validLastName) {
                    setLastNameError(true);
                    setLastNameErrorMsg('Last name is invalid');
                }
                if (validLastName) {
                    setLastNameError(false);
                    setLastNameErrorMsg('');
                }
            }
        }
    }, [lastNameBlurred])

    //Check if email the email is valid
    useEffect(() => {

        if (passwordBlurred) {
            setPasswordBlurred(false);
            if (password.length !== 0) {

                const validPassword = validatePassword({ password: password })

                if (!validPassword) {
                    setPasswordError(true);
                    setPasswordErrorMsg('Password is invalid');
                    setPasswordValid(false);
                }
                if (validPassword) {
                    setPasswordError(false);
                    setPasswordErrorMsg('');
                    setPasswordValid(true);
                }
            }
        }
    }, [passwordBlurred])

    //Check if email the email is valid
    useEffect(() => {
        if (passwordConfirmBlurred) {
            if (passwordConfirm.length !== 0) {
                if (passwordValid) {
                    setPasswordConfirmBlurred(false);
                    if (password !== passwordConfirm) {
                        setPasswordConfirmError(true);
                        setPasswordConfirmErrorMsg('Passwords must match');
                    }
                    if (password === passwordConfirm) {
                        setPasswordConfirmError(false);
                        setPasswordConfirmErrorMsg('');
                    }
                }
                else {
                    setPasswordConfirmError(true);
                    setPasswordConfirmErrorMsg('Passwords is invalid');
                }
            }
        }
    }, [passwordConfirmBlurred])

    //Submit handle
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email !== '' && firstName !== '' && lastName !== ''
            && password !== '' && passwordConfirm !== '') {
            if (imageUploaded) {
                var bodyFormData = new FormData();
                bodyFormData.append('email', email);
                bodyFormData.append('firstName', firstName.charAt(0).toUpperCase() + firstName.slice(1));
                bodyFormData.append('lastName', lastName.charAt(0).toUpperCase() + lastName.slice(1));
                bodyFormData.append('password', password);
                bodyFormData.append('passwordConfirm', passwordConfirm);
                bodyFormData.append('profileImage', image!);

                axios({
                    method: "POST",
                    url: "http://localhost:3333/auth/signup",
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                }).then(function (response) {
                    //Empty all of the fields
                    setEmail('');
                    setFirstName('');
                    setLastName('');
                    setPassword('');
                    setPasswordConfirm('');

                    //After succesfull registration we navigate to singing
                    navigate("/signin");
                }).catch(error => {
                    if (error.response?.status === 400) {
                        setErrorMessage('Values must be provided in the correct format');
                    }
                    else if (error.response?.status === 404) {
                        setErrorMessage('Not found !');
                    }
                    else if (error.response?.status === 409) {
                        setErrorMessage('User with that email already exists');
                    }
                    else if (error.response?.status === 500) {
                        setErrorMessage('Something unexpected went wrong');
                    }
                    else {
                        setErrorMessage('Registration failed')
                    }
                    errorRef.current?.focus();
                });
            }
            else {
                setErrorMessage('Please upload a profile image !');
                errorRef.current?.focus();
            }
        } else {
            setErrorMessage('Fields cannot be empty !');
            errorRef.current?.focus();
        }
    };

    //Image upload handle
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        let img = e.target.files[0];
        setImage(img);
        setImageUpoaded(true);
        setImagePath(URL.createObjectURL(img));
    }

    return (
        <Box component="form" noValidate={true} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography style={{ color: '#233D4D', fontWeight: 500, fontSize: 48 }}> Sign up </Typography>
            <Typography style={{ color: '#322D38', fontWeight: 400, fontSize: 16 }}>Your name will appear on posts and your public profile.</Typography>

            <ProfileImageUpload ImagePath={imagePath} onChange={handleImageUpload} />

            <RegularTextField variant='standard' value={email} label='Email' width={420} height={14} onBlur={(e: any) => setEmailBlurred(true)}
                onChange={(e: any) => setEmail(e.target.value)} sx={{ mt: 8 }} error={emailError} helperText={emailErrorMsg} />

            <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 420 }} sx={{ mt: 8 }}>
                <RegularTextField variant='standard' value={firstName} label='First Name' width={200} height={14} onBlur={(e: any) => setFirstNameBlurred(true)}
                    onChange={(e: any) => setFirstName(e.target.value)} sx={{ pb: 4 }} error={firstNameError} helperText={firstNameErrorMsg} />

                <RegularTextField variant='standard' value={lastName} label='Last Name' width={200} height={14} onBlur={(e: any) => setLastNameBlurred(true)}
                    onChange={(e: any) => setLastName(e.target.value)} sx={{ pb: 4 }} error={lastNameError} helperText={lastNameErrorMsg} />
            </Grid>

            <PasswordTextField variant='standard' value={password} label='Password' width={420} height={14} onBlur={(e: any) => setPasswordBlurred(true)}
                onChange={(e: any) => setPassword(e.target.value)} sx={{ mt: 8 }} error={passwordError} helperText={passwordErrorMsg} />

            <PasswordTextField variant='standard' value={passwordConfirm} label='Confirm Password' width={420} height={14} onBlur={(e: any) => setPasswordConfirmBlurred(true)}
                onChange={(e: any) => setPasswordConfirm(e.target.value)} sx={{ mt: 8 }} error={passwordConfirmError} helperText={passwordConfirmErrorMsg} />

            <ContainedButton type='submit' buttonText='SIGN IN' width={420} height={40} background="#619B8A" color="#FFFFFF" fontSize={16} fontWeight={400} onClick={null} sx={{ mt: 7 }} />

            <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 420 }} sx={{ mt: 1 }}  >
                <Typography style={{ color: '#322D38', fontWeight: 400, fontSize: 16 }}> Already have an account? </Typography>
                <TextButton type='button' buttonText='Sign in' width={80} height={30} color="#619B8A" fontSize={16} fontWeight={400} onClick={() => navigate('/signin')} sx={null} />
            </Grid>
            <Typography style={{ color: 'red' }} ref={errorRef}>{errorMessage}</Typography>
        </Box>
    )
}

export default SignupForm