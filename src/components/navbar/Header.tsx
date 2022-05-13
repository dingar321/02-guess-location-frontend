import React, { useState } from 'react'
import { Hidden, AppBar, Button, Container, Toolbar, Typography, IconButton, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { SwipeableDrawer } from '@mui/material'
import { Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const HeaderLogo = require('../../assets/navbar/navbar-logo.png') as string;


const TextButtontyle = {
    /* Text based buttons */
    marginRight: 15,
    color: '#233D4D',

    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '19px',
}

const ButtonStyle = {
    /* contained based buttons */
    width: '137px',
    height: '31px',
    background: '#619B8A',

    fontWeight: '400px',
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
    fontWeight: '400px',
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
    fontWeight: '400px',
    fontSize: '16px',
    lineHeight: '19px',
}

const HamburgerTextButtontyle = {
    /* Text based buttons */
    marginRight: 15,
    color: '#233D4D',

    fontWeight: '400',
    fontSize: '24px',
    lineHeight: '28 px',
}

const Header = () => {

    const [openBurgerMenu, setOpenBurgerMenu] = useState<boolean>(false);

    return (
        <AppBar sx={{ background: 'white', my: 5, mx: 1 }} position='sticky' elevation={0}>

            {/* Default header */}
            <Container maxWidth='xl'>
                <Toolbar disableGutters>

                    <Typography color="inherit" noWrap sx={{ mx: 0, flexGrow: 1 }}>
                        <img src={HeaderLogo} />
                    </Typography>

                    <Hidden smDown>
                        {/* Default header content */}
                        <Button variant="text" style={TextButtontyle}> Sign in </Button>
                        <Typography sx={{ color: '#233D4D', fontWeight: 'normal', fontSize: '16px', lineHeight: '19px', }} >or</Typography>
                        <Button variant="contained" style={ButtonStyle} sx={{ mx: 0 }} > SIGN UP </Button>
                    </Hidden>
                    <Hidden smUp>
                        <IconButton style={{ color: '#619B8A' }}>
                            <MenuIcon onClick={() => setOpenBurgerMenu(true)} />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </Container>

            {/* Hamburger header */}
            <SwipeableDrawer anchor='top' open={openBurgerMenu} onOpen={() => setOpenBurgerMenu(true)} onClose={() => setOpenBurgerMenu(false)}>
                <div>
                    <IconButton style={{ float: 'right', color: '#619B8A' }} sx={{ my: 1 }}>
                        <CloseIcon onClick={() => setOpenBurgerMenu(false)} />
                    </IconButton>
                </div>
                <Divider />
                <div>
                    {/* Hamburger header content */}
                    <Box sx={{ my: 2, mx: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'static' }}>
                        <Typography style={HamburgerTextButtontyle}> Home </Typography>
                        <IconButton style={{ color: '#233D4D' }}>
                            <ChevronRightIcon style={{ width: '25px', height: '25px' }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ my: 2, mx: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Button variant="contained" style={HamburgerButtonStyleSignUp} sx={{ my: 0.5, mx: 5, }} > SIGN UP </Button>
                        <Button variant="contained" style={HamburgerButtonStyleSignIn} sx={{ my: 0.5, mx: 5, }} > SIGN IN </Button>
                    </Box>
                </div>
            </SwipeableDrawer>

        </AppBar >
    )
}

export default Header;