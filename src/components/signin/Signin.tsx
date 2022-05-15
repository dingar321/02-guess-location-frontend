import React, { useEffect, useState } from 'react'
import { Avatar, Button, Container, Grid, Hidden, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import ButtonXl from '../buttons/ButtonXl';
import ButtonLink from '../buttons/ButtonLink';
import { styled } from '@mui/material/styles';
import Header from '../header/Header';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HamburgerHeader from '../header/HamburgerHeader';

const RightSideVector = require('../../assets/images/form-right-vector.png') as string;
const AvatarIcon = require('../../assets/icons/avatar-icon.png') as string;
const HeaderLogo = require('../../assets/images/header-logo-full.png') as string;

//xs={false} 

const Signin = () => {

    const [errorMessage, setErrorMessage] = useState<string>('');
    const errorRef = React.useRef<HTMLInputElement | null>(null)

    //Showing the password
    const [passwordShow, setPasswordShow] = useState<boolean>(false);

    //User provided values
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');


    //Anytime there is an error and the user changes the state
    //Of any of the inputs the error message gets removed
    useEffect(() => {
        setErrorMessage('');
    }, [email, password,])


    //Submit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (email == '' && password == '') {
            {/* Some of the provided values are empty */ }
            setErrorMessage('Fields cannot be empty');
            errorRef.current?.focus();
        }

        if (email != '' && password != '') {
            {/* Valid */ }
            console.log('valid');
        }


    };

    //Hiding and showing the password
    const handleClickPasswordShow = () => {
        if (passwordShow) {
            setPasswordShow(false);
        }
        if (!passwordShow) {
            setPasswordShow(true);
        }
    };

    return (
        <div>
            <Grid container>
                <Hidden lgDown>
                    {/* Normal view, display only the form  */}
                    <Grid item xs={12} sm={6} style={{ padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                        <Typography noWrap> <img src={HeaderLogo} style={{ paddingTop: '20px', paddingLeft: '40px' }} /> </Typography>
                        <div>
                            {/* Form */}
                            <Box component="form" noValidate={true} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                <Typography style={{ color: '#233D4D', fontWeight: 500, fontSize: 48 }}> Sign in </Typography>
                                <Typography style={{ color: '#322D38', fontWeight: 400, fontSize: 16 }}>Welcome back to Geotagger.</Typography>
                                <Typography style={{ color: '#322D38', fontWeight: 400, fontSize: 16 }}>We are glad to see you again.</Typography>

                                <Typography style={{ color: '#322D38', fontWeight: 500, fontSize: 16, paddingRight: 370 }} sx={{ mt: 2 }}>Email:</Typography>
                                <TextField label='Email' type="text" required autoComplete='off' placeholder='' variant="outlined" style={{ width: 420, height: 14 }} sx={{ mt: 0.5 }}
                                    onChange={(e) => setEmail(e.target.value)} />

                                <Typography style={{ color: '#322D38', fontWeight: 500, fontSize: 16, paddingRight: 340 }} sx={{ mt: 9 }}>Password:</Typography>
                                <TextField label="Password" required autoComplete='off' placeholder='' variant="outlined" style={{ width: 420, height: 14 }} sx={{ mt: 0.5 }}
                                    onChange={(e) => setPassword(e.target.value)}
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

                                <Button variant="contained" type='submit' style={ButtonXl} sx={{ mt: 8 }}> SIGN IN </Button>
                                <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 420 }} sx={{ mt: 1 }}  >
                                    <Typography style={{ color: '#322D38', fontWeight: 400, fontSize: 16 }}> Do you want to create an account? </Typography>
                                    <Button variant="text" disableRipple style={ButtonLink} > Sign up </Button>
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
                    {/* Form */}
                    <Hidden smUp>
                        {/* Hamburger header only shows if we are on a small window size   */}
                        <HamburgerHeader />
                    </Hidden>
                    <Container style={{ paddingTop: '18em' }}>
                        <Box component="form" noValidate={true} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography style={{ color: '#233D4D', fontWeight: 500, fontSize: 48 }}> Sign in </Typography>
                            <Typography style={{ color: '#322D38', fontWeight: 400, fontSize: 16 }}>Welcome back to Geotagger. <br /> We are glad to see you again.</Typography>

                            <Typography style={{ color: '#322D38', fontWeight: 500, fontSize: 16, paddingRight: 370 }} sx={{ mt: 2 }}>Email:</Typography>
                            <TextField label='Email' type="text" required autoComplete='off' placeholder='' variant="outlined" style={{ width: 420, height: 14 }} sx={{ mt: 0.5 }}
                                onChange={(e) => setEmail(e.target.value)} />

                            <Typography style={{ color: '#322D38', fontWeight: 500, fontSize: 16, paddingRight: 340 }} sx={{ mt: 9 }}>Password:</Typography>
                            <TextField label="Password" required autoComplete='off' placeholder='' variant="outlined" style={{ width: 420, height: 14 }} sx={{ mt: 0.5 }}
                                onChange={(e) => setPassword(e.target.value)}
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

                            <Button variant="contained" type='submit' style={ButtonXl} sx={{ mt: 8 }}> SIGN IN </Button>
                            <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 420 }} sx={{ mt: 1 }}  >
                                <Typography style={{ color: '#322D38', fontWeight: 400, fontSize: 16 }}> Do you want to create an account? </Typography>
                                <Button variant="text" disableRipple style={ButtonLink} > Sign up </Button>
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

export default Signin