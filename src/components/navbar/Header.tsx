import React, { useState } from 'react'
import { Hidden, AppBar, Button, Container, Toolbar, Typography, IconButton, Box, Avatar, createTheme, createStyles, makeStyles } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { SwipeableDrawer } from '@mui/material'
import { Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

//images
const HeaderLogo = require('../../assets/images/header-logo-full.png') as string;
const AddIcon = require('../../assets/icons/add-icon.png') as string;
const AvatarIcon = require('../../assets/icons/avatar-icon.png') as string;

const TextButtontyle = {
    /* Text based buttons */
    marginRight: 15,
    color: '#233D4D',

    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '19px',
}

const ButtonStyle = {
    /* contained based buttons */
    width: '137px',
    height: '31px',
    background: '#619B8A',

    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',

    marginLeft: 20,
}

const HamburgerButtonStyleSignUp = {
    /* hamburger based buttons */
    width: '300px',
    height: '40px',
    background: '#619B8A',

    borderRadius: '4px',

    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
}

const HamburgerButtonStyleSignIn = {
    /* hamburger based buttons */
    width: '300px',
    height: '40px',
    borderColor: '#619B8A',
    background: 'white',
    color: '#619B8A',
    borderRadius: '4px',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '19px',
    border: '2px solid'
}


/*
TODO:
FIX MIN-WIDTH

*/


const Header = () => {
    //Opening and closing the burger menu
    const [openBurgerMenu, setOpenBurgerMenu] = useState<boolean>(false);

    //Setting if user is logged in
    const [logged, setLogged] = useState<boolean>(false);

    return (
        <nav style={{ background: 'white', height: '100px', paddingTop: '20px', }}>
            {/* Default header */}

            <Container style={{ maxWidth: 1500 }}>
                <Toolbar disableGutters>
                    <Hidden smDown>
                        <Typography noWrap sx={{ mx: 0, flexGrow: 1 }} style={{ paddingLeft: '40px' }} > <img src={HeaderLogo} /> </Typography>
                        {/* Default header content */}
                        {((!logged)) &&
                            <>
                                <Button variant="text" style={TextButtontyle}> Sign in </Button>
                                <Typography sx={{ color: '#233D4D', fontWeight: 'normal', fontSize: '16px', lineHeight: '19px', }} >or</Typography>
                                <Button variant="contained" style={ButtonStyle} sx={{ mx: 0 }} > SIGN UP </Button>
                            </>
                        }

                        {((logged)) &&
                            <>
                                <Button variant="text" style={TextButtontyle}> Home </Button>
                                <Button variant="text" style={TextButtontyle}> Profile settings </Button>
                                <Button variant="text" style={TextButtontyle}> Logout </Button>
                                <Avatar alt="profile-image" src={AvatarIcon} sx={{ mx: 2.5 }} />
                                <Avatar alt="" src={AddIcon} />
                            </>
                        }
                    </Hidden>
                    <Hidden smUp >
                        <Typography noWrap sx={{ mx: 0, flexGrow: 1 }} style={{ paddingLeft: '40px', paddingTop: '10px' }} > <img src={HeaderLogo} /> </Typography>
                        {/* When header is > 600px we show the hamburger menu */}
                        <IconButton style={{ color: '#619B8A', paddingTop: '10px' }} sx={{ sm: 1, mx: 5 }} onClick={() => setOpenBurgerMenu(true)}>
                            <MenuIcon sx={{ fontSize: 35 }} />
                        </IconButton>


                    </Hidden>

                </Toolbar>
            </Container>

            {/* Hamburger header */}
            <SwipeableDrawer anchor='top' open={openBurgerMenu} onOpen={() => setOpenBurgerMenu(true)} onClose={() => setOpenBurgerMenu(false)}>
                <div>
                    <IconButton style={{ float: 'right', color: '#619B8A' }} sx={{ my: 1 }} onClick={() => setOpenBurgerMenu(false)} >
                        <CloseIcon sx={{ fontSize: '24px' }} style={{ marginRight: '55px', borderRadius: '4px', background: 'white' }} />
                    </IconButton>
                </div>
                <Divider />
                {/* Hamburger header content */}
                {((!logged)) &&
                    <>
                        <div>
                            <Box sx={{ my: 2, mx: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <IconButton style={{
                                    color: '#233D4D', background: 'white', borderRadius: '4px', width: '300px', height: '40px',
                                    justifyContent: 'space-between', marginBottom: '30px', marginTop: '10px'
                                }}>
                                    <Typography sx={{ fontSize: '24px' }}> Home </Typography>
                                    <ChevronRightIcon sx={{ fontSize: 35 }} />
                                </IconButton>

                                <Button variant="contained" style={HamburgerButtonStyleSignUp} sx={{ my: 0.5, mx: 5, }} > SIGN UP </Button>
                                <Button variant="contained" style={HamburgerButtonStyleSignIn} sx={{ my: 0.5, mx: 5, }} > SIGN IN </Button>
                            </Box>
                        </div>
                    </>
                }

                {((logged)) &&
                    <>
                        <div>
                            <Box sx={{ my: 2, mx: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                {/* Profile image and full name */}
                                <IconButton style={{
                                    color: '#233D4D', background: 'white', borderRadius: '4px', width: '300px', height: '40px',
                                    justifyContent: 'left', marginBottom: '30px', marginTop: '10px'
                                }}>
                                    <Avatar alt="profile-image" src={AvatarIcon} />
                                    <Typography sx={{ fontSize: '24px' }} style={{ paddingLeft: '30px' }}> Name Last </Typography>
                                </IconButton>

                                {/* Home button */}
                                <IconButton style={{
                                    color: '#233D4D', background: 'white', borderRadius: '4px', width: '300px', height: '40px',
                                    justifyContent: 'space-between', marginBottom: '30px', marginTop: '10px'
                                }}>
                                    <Typography sx={{ fontSize: '24px' }}> Home </Typography>
                                    <ChevronRightIcon sx={{ fontSize: 35 }} />
                                </IconButton>

                                {/* Profile settings button */}
                                <IconButton style={{
                                    color: '#233D4D', background: 'white', borderRadius: '4px', width: '300px', height: '40px',
                                    justifyContent: 'space-between', marginBottom: '30px', marginTop: '-20px'
                                }}>
                                    <Typography sx={{ fontSize: '24px' }}> Profile settings </Typography>
                                    <ChevronRightIcon sx={{ fontSize: 35 }} />
                                </IconButton>

                                {/* Logout button */}
                                <IconButton style={{
                                    color: '#233D4D', background: 'white', borderRadius: '4px', width: '300px', height: '40px',
                                    justifyContent: 'space-between', marginBottom: '30px', marginTop: '-20px',
                                }}>
                                    <Typography sx={{ fontSize: '24px' }} style={{ color: '#619B8A', }}> Logout </Typography>
                                    <ChevronRightIcon sx={{ fontSize: 35 }} style={{ color: '#619B8A', }} />
                                </IconButton>
                            </Box>
                        </div>
                    </>
                }

            </SwipeableDrawer>

        </nav >
    )
}

export default Header;

function makeStyle() {
    throw new Error('Function not implemented.')
}
