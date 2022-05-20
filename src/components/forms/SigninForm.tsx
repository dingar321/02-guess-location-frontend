import { Box, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ContainedButton from '../buttons/ContainedButton';
import ButtonContained from '../buttons/ContainedButton';
import TextButton from '../buttons/TextButton';
import ButtonText from '../buttons/TextButton';
import PasswordTextField from './inputs/PasswordTextField';
import RegularTextField from './inputs/RegularTextField';

const SigninForm = () => {
    //navigation between pages
    const navigate = useNavigate();

    //Error handling
    const [errorMessage, setErrorMessage] = useState<string>('');
    const errorRef = React.useRef<HTMLInputElement | null>(null)

    //User provided values
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');


    //Empt error message when changing values form from
    useEffect(() => {
        setErrorMessage('');
        if (email !== '') {
            setEmailError(false);
            setEmailErrorMsg('');
        }
    }, [email, password,])

    useEffect(() => {
        setErrorMessage('');
        if (password !== '') {
            setPasswordError(false);
            setPasswordErrorMsg('');
        }
    }, [password,])

    //Cheking if the fields are empty
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');

    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordErrorMsg, setPasswordErrorMsg] = useState<string>('');


    //Submiting the form 
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email !== '' && password !== '') {
            axios({
                method: "post",
                url: "http://localhost:3333/auth/signin",
                data: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }).then(function (response) {
                //Empty all of the fields
                setEmail('');
                setPassword('');
                //After succesfull registration we navigate to singing
                navigate("/");
            }).catch(error => {
                setErrorMessage('Credentials incorrect !')
                errorRef.current?.focus();
            });
        } else {
            {/* Some of the provided values are empty */ }
            if (email === '') {
                setEmailError(true);
                setEmailErrorMsg('Field cannot be empty');
            }
            if (password === '') {
                setPasswordError(true);
                setPasswordErrorMsg('Field cannot be empty');
            }


            errorRef.current?.focus();
        }
    };

    return (

        <Box component="form" noValidate={true} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

            <Typography style={{ color: '#233D4D', fontWeight: 500, fontSize: 48 }}>
                Sign in
            </Typography>
            <Typography style={{ color: '#322D38', fontWeight: 400, fontSize: 16 }}>
                Welcome back to Geotagger. We are glad to see you again.
            </Typography>

            <Typography style={{ color: '#322D38', fontWeight: 500, fontSize: 16, paddingRight: 370 }} sx={{ mt: 3 }}>Email:</Typography>
            <RegularTextField variant='outlined' value={email} label='' width={420} height={14} onBlur={null}
                onChange={(e: any) => setEmail(e.target.value)} error={emailError} helperText={emailErrorMsg} sx={{ mt: 1.5 }} />

            <Typography style={{ color: '#322D38', fontWeight: 500, fontSize: 16, paddingRight: 340 }} sx={{ mt: 8 }}>Password:</Typography>
            <PasswordTextField variant='outlined' value={password} label='' width={420} height={14} onBlur={null}
                onChange={(e: any) => setPassword(e.target.value)} error={passwordError} helperText={passwordErrorMsg} sx={{ mt: 1.5 }} />

            <ContainedButton type='submit' buttonText='SIGN IN' width={420} height={40} background="#619B8A" color="#FFFFFF" fontSize={16} fontWeight={400} onClick={null} sx={{ mt: 10 }} />

            <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 420 }} sx={{ mt: 1 }}  >
                <Typography style={{ color: '#322D38', fontWeight: 400, fontSize: 16 }}> Do you want to create an account? </Typography>
                <TextButton type='button' buttonText='Sign up' width={80} height={30} color="#619B8A" fontSize={16} fontWeight={400} onClick={() => navigate('/signup')} sx={null} />
            </Grid>

            <Typography style={{ color: 'red' }} ref={errorRef}>{errorMessage}</Typography>

        </Box>

    )
}

export default SigninForm