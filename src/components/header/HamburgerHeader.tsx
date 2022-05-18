import { useState } from 'react'
import { AppBar, Button, Typography, IconButton, Box, Avatar, Paper } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { SwipeableDrawer } from '@mui/material'
import { Divider } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom'

//images
const HeaderLogo = require('../../assets/images/header-logo-full.png') as string;
const AddIcon = require('../../assets/icons/add-icon.png') as string;
const AvatarIcon = require('../../assets/icons/avatar-icon.png') as string;


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



const HamburgerHeader = () => {

    //navigation between pages
    const navigate = useNavigate();

    //Navigate funtions
    function navigateProfile() {
        navigate("/profile");
    }

    function navigateSignin() {
        navigate("/signin");
    }

    function navigateSignup() {
        navigate("/signup");
    }

    function navigateHome() {
        navigate("/");
    }

    function navigateSignout() { }


    //Opening and closing the burger menu
    const [openBurgerMenu, setOpenBurgerMenu] = useState<boolean>(false);
    //Setting if user is logged in
    const [logged, setLogged] = useState<boolean>(false);

    return (
        <div>
            <AppBar sx={{ pt: 2, px: 0, padding: 3, heigth: 400, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', background: 'white' }} component={Paper} elevation={2}>
                <Typography noWrap sx={{ mx: 0, flexGrow: 1 }} onClick={navigateHome}  > <img src={HeaderLogo} /> </Typography>
                {/* When header is > 600px we show the hamburger menu */}
                <IconButton style={{ color: '#619B8A', paddingTop: '10px', margin: 5, borderRadius: '4px' }} sx={{ sm: 1, mx: 5 }} onClick={() => setOpenBurgerMenu(true)}>
                    <MenuIcon sx={{ fontSize: 35 }} />
                </IconButton>
            </AppBar>
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
                                <IconButton onClick={navigateHome} style={{
                                    color: '#233D4D', background: 'white', borderRadius: '4px', width: '300px', height: '40px',
                                    justifyContent: 'space-between', marginBottom: '30px', marginTop: '10px'
                                }}>
                                    <Typography sx={{ fontSize: '24px' }} > Home </Typography>
                                    <ChevronRightIcon sx={{ fontSize: 35 }} />
                                </IconButton>

                                <Button variant="contained" style={HamburgerButtonStyleSignUp} sx={{ my: 0.5, mx: 5, }} onClick={navigateSignup} > SIGN UP </Button>
                                <Button variant="contained" style={HamburgerButtonStyleSignIn} sx={{ my: 0.5, mx: 5, }} onClick={navigateSignin} > SIGN IN </Button>
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
        </div>
    )
}

export default HamburgerHeader