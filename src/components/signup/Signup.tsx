import React, { useEffect, useState } from 'react'
import { Avatar, Button, Container, Grid, Hidden, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import ButtonXl from '../buttons/ButtonXl';
import ButtonLink from '../buttons/ButtonLink';
import { styled } from '@mui/material/styles';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HamburgerHeader from '../header/HamburgerHeader';
import { useNavigate } from 'react-router-dom';
import axios, { Axios } from 'axios';
import { blob } from 'stream/consumers';

//Image uploads:
//https://stackoverflow.com/questions/57474348/specify-type-for-file-upload-event-in-react-typescript

const RightSideVector = require('../../assets/images/form-right-vector.png') as string;
const AvatarIcon = require('../../assets/icons/avatar-icon.png') as string;
const HeaderLogo = require('../../assets/images/header-logo-full.png') as string;

const Signup = () => {

    const [errorMessage, setErrorMessage] = useState<string>('');
    const errorRef = React.useRef<HTMLInputElement | null>(null)

    //Showing the password
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const [passwordConfirmShow, setPasswordConfirmShow] = useState<boolean>(false);


    //Values provided by the user
    const [file, setFile] = useState<File>()
    const [uploadedFilePath, setUploadedFilePath] = useState<string>('')

    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [passwordConfirmBlurred, setPasswordConfirmBlurred] = useState<boolean>(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState<boolean>(false);
    const [passwordConfirmErrorMsg, setPasswordConfirmErrorMsg] = useState<string>('');
    const [passwordConfirmValid, setPasswordConfirmValid] = useState<boolean>(false);


    const [password, setPassword] = useState<string>('');
    const [passwordBlurred, setPasswordBlurred] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>('');
    const [passwordValid, setPasswordValid] = useState<boolean>(false);


    const [lastName, setLastName] = useState<string>('');
    const [lastNameBlurred, setLastNameBlurred] = useState<boolean>(false);
    const [lastNameError, setLastNameError] = useState<boolean>(false);
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState<string>('');
    const [lastNameValid, setLastNameValid] = useState<boolean>(false);

    const [firstName, setFirstName] = useState<string>('');
    const [firstNameBlurred, setFirstNameBlurred] = useState<boolean>(false);
    const [firstNameError, setFirstNameError] = useState<boolean>(false);
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState<string>('');
    const [firstNameValid, setFirstNameValid] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [emailBlurred, setEmailBlurred] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');
    const [emailValid, setEmailValid] = useState<boolean>(false);

    //Anytime there is an error and the user changes the state
    //Of any of the inputs the error message gets removed
    useEffect(() => {
        setErrorMessage('');
    }, [email, firstName, lastName, password, passwordConfirm])


    //Check if email the email is valid
    useEffect(() => {
        if (emailBlurred) {
            setEmailBlurred(false);
            if (email.length !== 0) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const isEmailValid = emailRegex.test(email);
                if (!isEmailValid) {
                    setEmailError(true);
                    setEmailErrorMsg('Email is invalid');
                    setEmailValid(false);
                }
                if (isEmailValid) {
                    setEmailError(false);
                    setEmailErrorMsg('');
                    setEmailValid(true);
                }
            }
        }
    }, [emailBlurred])

    //Check if email the email is valid
    useEffect(() => {
        if (firstNameBlurred) {
            setFirstNameBlurred(false);
            if (firstName.length !== 0) {
                const nameRegex = /^[a-zA-Z]{2,99}$/;
                const isFirstNameValid = nameRegex.test(firstName);
                if (!isFirstNameValid) {
                    setFirstNameError(true);
                    setFirstNameErrorMsg('First name is invalid');
                    setFirstNameValid(false);
                }
                if (isFirstNameValid) {
                    setFirstNameError(false);
                    setFirstNameErrorMsg('');
                    setFirstNameValid(true);
                }
            }
        }
    }, [firstNameBlurred])

    //Check if email the email is valid
    useEffect(() => {

        if (lastNameBlurred) {
            setLastNameBlurred(false);
            if (lastName.length !== 0) {
                const nameRegex = /^[a-zA-Z]{2,255}$/;
                const isLastNameValid = nameRegex.test(lastName);
                if (!isLastNameValid) {
                    setLastNameError(true);
                    setLastNameErrorMsg('Last name is invalid');
                    setLastNameValid(false);
                }
                if (isLastNameValid) {
                    setLastNameError(false);
                    setLastNameErrorMsg('');
                    setLastNameValid(true);
                }
            }
        }
    }, [lastNameBlurred])

    //Check if email the email is valid
    useEffect(() => {

        if (passwordBlurred) {
            setPasswordBlurred(false);
            if (password.length !== 0) {
                const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,255}$/;
                const isPasswordValid = passwordRegex.test(password);
                if (!isPasswordValid) {
                    setPasswordError(true);
                    setPasswordErrorMsg('Password is invalid');
                    setPasswordValid(false);
                }
                if (isPasswordValid) {
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
                        setPasswordConfirmValid(false);
                    }
                    if (password === passwordConfirm) {
                        setPasswordConfirmError(false);
                        setPasswordConfirmErrorMsg('');
                        setPasswordConfirmValid(true);
                    }
                }
                else {
                    setPasswordConfirmError(true);
                    setPasswordConfirmErrorMsg('Passwords is invalid');
                    setPasswordConfirmValid(false);
                }
            }
        }
    }, [passwordConfirmBlurred])


    //Submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (emailValid === true && firstNameValid === true && lastNameValid === true
            && passwordValid === true && passwordConfirmValid === true) {
            {/* Provided values are valid */ }

            if (file !== null) {
                var bodyFormData = new FormData();
                bodyFormData.append('email', email);
                bodyFormData.append('firstName', firstName.charAt(0).toUpperCase() + firstName.slice(1));
                bodyFormData.append('lastName', lastName.charAt(0).toUpperCase() + lastName.slice(1));
                bodyFormData.append('password', password);
                bodyFormData.append('passwordConfirm', passwordConfirm);
                bodyFormData.append('profileImage', file!);

                axios({
                    method: "post",
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

                // -------------------------------------
                // TODO: Check if image is uploaded, we cannot continue without adding it
                // -------------------------------------
            } else {
                setErrorMessage('You must also uploade a profile picture');
                errorRef.current?.focus();
            }


        } else if (email === '' && firstName === '' && lastName === ''
            && password === '' && passwordConfirm === '' && !file) {
            {/* Some of the provided values are empty */ }
            setErrorMessage('Fields must not be empty');
            errorRef.current?.focus();
        }
    };
    //Remove the input field from showing up
    const Input = styled('input')({
        display: 'none',
    });

    //navigation between pages
    const navigate = useNavigate();
    function navigateHome() {
        navigate("/");
    }
    function navigateSignin() {
        navigate("/signin");
    }


    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        let img = e.target.files[0];
        setFile(img);
        setUploadedFilePath(URL.createObjectURL(img));
    }

    //Hiding and showing the password
    const handleClickPasswordShow = () => {
        if (passwordShow) {
            setPasswordShow(false);
        }
        if (!passwordShow) {
            setPasswordShow(true);
        }
    };

    const handleClickPasswordConfirmShow = () => {
        if (passwordConfirmShow) {
            setPasswordConfirmShow(false);
        }
        if (!passwordConfirmShow) {
            setPasswordConfirmShow(true);
        }
    };

    return (
        <div>
            <Grid container>
                <Hidden lgDown>
                    {/* Normal view, display only the form  */}
                    <Grid item xs={12} sm={6} style={{ padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                        <Typography noWrap style={{ paddingLeft: 90, paddingTop: '24px', }} onClick={navigateHome} > <img alt='logo' src={HeaderLogo} /> </Typography>
                        <div>
                            {/* Form */}
                            <Box component="form" noValidate={true} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography style={{ color: '#233D4D', fontWeight: 500, fontSize: 48 }}> Sign up </Typography>
                                <Typography style={{ color: '#322D38', fontWeight: 400, fontSize: 16 }}>Your name will appear on posts and your public profile.</Typography>

                                <label htmlFor="icon-button-file" style={{ paddingTop: 10 }}>
                                    <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChange} />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        {((!uploadedFilePath)) &&
                                            <>
                                                <Avatar style={{ width: 64, height: 64 }} src={AvatarIcon} />
                                            </>
                                        }
                                        {((uploadedFilePath)) &&
                                            <>
                                                <Avatar style={{ width: 64, height: 64 }} src={uploadedFilePath} />
                                            </>
                                        }
                                    </IconButton>
                                </label>

                                <TextField label='Email' type="text" required autoComplete='off' placeholder='' variant="standard" style={{ width: 420, height: 14 }} sx={{ mt: 0 }}
                                    onChange={(e) => setEmail(e.target.value)} error={emailError} helperText={emailErrorMsg} onBlur={() => setEmailBlurred(true)} />
                                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 420 }} sx={{ mt: 9 }}>
                                    <TextField label="First Name" type="text" required autoComplete='off' placeholder='' variant="standard" style={{ width: 200, height: 14 }}
                                        onChange={(e) => setFirstName(e.target.value)} error={firstNameError} helperText={firstNameErrorMsg} onBlur={() => setFirstNameBlurred(true)} />

                                    <TextField label="Last Name" type="text" required autoComplete='off' placeholder='' variant="standard" style={{ width: 200, height: 14 }}
                                        onChange={(e) => setLastName(e.target.value)} error={lastNameError} helperText={lastNameErrorMsg} onBlur={() => setLastNameBlurred(true)} />
                                </Box>
                                <TextField label="Password" required autoComplete='off' placeholder='' variant="standard" style={{ width: 420, height: 14 }} sx={{ mt: 9 }}
                                    onChange={(e) => setPassword(e.target.value)} error={passwordError} helperText={passwordErrorMsg} onBlur={() => setPasswordBlurred(true)}
                                    id="outlined-adornment-password"
                                    type={passwordShow ? "text" : "password"}
                                    value={password}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickPasswordShow}
                                                    edge="end" >
                                                    {passwordShow ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <TextField label="Confirm Password" required autoComplete='off' placeholder='' variant="standard" style={{ width: 420, height: 14 }} sx={{ mt: 9 }}
                                    onChange={(e) => setPasswordConfirm(e.target.value)} error={passwordConfirmError} helperText={passwordConfirmErrorMsg} onBlur={() => setPasswordConfirmBlurred(true)}
                                    id="outlined-adornment-password-confirm"
                                    type={passwordConfirmShow ? "text" : "password"}
                                    value={passwordConfirm}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickPasswordConfirmShow}
                                                    edge="end">
                                                    {passwordConfirmShow ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <Button variant="contained" type='submit' style={ButtonXl} sx={{ mt: 8 }}> SIGN UP </Button>
                                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 420 }} sx={{ mt: 1 }}  >
                                    <Typography style={{ color: '#322D38', fontWeight: 400, fontSize: 16 }}> Already have an account? </Typography>
                                    <Button variant="text" disableRipple style={ButtonLink} type="submit" onClick={navigateSignin} > Sign in </Button>
                                </Box>
                                <Box style={{ color: 'red', textAlign: 'justify' }}>
                                    {/* TODO: Move to a dialog <--------------------------------- */}
                                    <Typography ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive" >{errorMessage}</Typography>
                                </Box>
                            </Box>

                            {/* /Form */}
                        </div>
                        <div />
                    </Grid>
                    <Grid container item xs={12} sm={6}>
                        <img src={RightSideVector} style={{ width: '100%', height: '100vh', objectFit: 'cover' }} alt="" />
                    </Grid>
                </Hidden>

                <Hidden lgUp>
                    {/* Phone view, display only the form  */}
                    <Hidden smUp>
                        {/* Hamburger header only shows if we are on a small window size   */}
                        <HamburgerHeader />
                    </Hidden>
                    <Container style={{ paddingTop: '10em' }}>
                        {/* Form */}
                        <Box component="form" noValidate={true} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography style={{ color: '#233D4D', fontWeight: 500, fontSize: 48 }}> Sign up </Typography>
                            <Typography style={{ color: '#322D38', fontWeight: 400, fontSize: 16 }}>Your name will appear on posts and your public profile.</Typography>

                            <label htmlFor="icon-button-file" style={{ paddingTop: 10 }}>
                                <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChange} />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    {((!uploadedFilePath)) &&
                                        <>
                                            <Avatar style={{ width: 64, height: 64 }} src={AvatarIcon} />
                                        </>
                                    }
                                    {((uploadedFilePath)) &&
                                        <>
                                            <Avatar style={{ width: 64, height: 64 }} src={uploadedFilePath} />
                                        </>
                                    }
                                </IconButton>
                            </label>

                            <TextField label='Email' type="text" required autoComplete='off' placeholder='' variant="standard" style={{ width: 420, height: 14 }} sx={{ mt: 0 }}
                                onChange={(e) => setEmail(e.target.value)} error={emailError} helperText={emailErrorMsg} onBlur={() => setEmailBlurred(true)} />
                            <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 420 }} sx={{ mt: 9 }}>
                                <TextField label="First Name" type="text" required autoComplete='off' placeholder='' variant="standard" style={{ width: 200, height: 14 }}
                                    onChange={(e) => setFirstName(e.target.value)} error={firstNameError} helperText={firstNameErrorMsg} onBlur={() => setFirstNameBlurred(true)} />

                                <TextField label="Last Name" type="text" required autoComplete='off' placeholder='' variant="standard" style={{ width: 200, height: 14 }}
                                    onChange={(e) => setLastName(e.target.value)} error={lastNameError} helperText={lastNameErrorMsg} onBlur={() => setLastNameBlurred(true)} />
                            </Box>
                            <TextField label="Password" required autoComplete='off' placeholder='' variant="standard" style={{ width: 420, height: 14 }} sx={{ mt: 9 }}
                                onChange={(e) => setPassword(e.target.value)} error={passwordError} helperText={passwordErrorMsg} onBlur={() => setPasswordBlurred(true)}
                                id="outlined-adornment-password"
                                type={passwordShow ? "text" : "password"}
                                value={password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickPasswordShow}
                                                edge="end" >
                                                {passwordShow ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField label="Confirm Password" required autoComplete='off' placeholder='' variant="standard" style={{ width: 420, height: 14 }} sx={{ mt: 9 }}
                                onChange={(e) => setPasswordConfirm(e.target.value)} error={passwordConfirmError} helperText={passwordConfirmErrorMsg} onBlur={() => setPasswordConfirmBlurred(true)}
                                id="outlined-adornment-password-confirm"
                                type={passwordConfirmShow ? "text" : "password"}
                                value={passwordConfirm}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickPasswordConfirmShow}
                                                edge="end">
                                                {passwordConfirmShow ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button variant="contained" type='submit' style={ButtonXl} sx={{ mt: 8 }}> SIGN UP </Button>
                            <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 420 }} sx={{ mt: 1 }}  >
                                <Typography style={{ color: '#322D38', fontWeight: 400, fontSize: 16 }}> Already have an account? </Typography>
                                <Button variant="text" disableRipple style={ButtonLink} > Sign in </Button>
                            </Box>
                            <Box style={{ color: 'red', textAlign: 'justify' }}>
                                {/* TODO: Move to a dialog <--------------------------------- */}
                                <Typography ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive" >{errorMessage}</Typography>
                            </Box>
                        </Box>

                        {/* /Form */}
                    </Container>
                </Hidden>
            </Grid >
        </div >
    )
}

export default Signup



