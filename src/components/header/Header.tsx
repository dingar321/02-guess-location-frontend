import { useState } from 'react'
import { Hidden, Button, Container, Toolbar, Typography, Avatar } from '@mui/material'
import HamburgerHeader from './HamburgerHeader'
import ButtonMd from '../buttons/ButtonMd';
import ButtonLink from '../buttons/ButtonLink';
import { useNavigate } from 'react-router-dom';

//images
const HeaderLogo = require('../../assets/images/header-logo-full.png') as string;
const AddIcon = require('../../assets/icons/add-icon.png') as string;
const AvatarIcon = require('../../assets/icons/avatar-icon.png') as string;

const Header = () => {
    //Setting if user is logged in
    const [logged, setLogged] = useState<boolean>(false);

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

    if (window.location.pathname !== '/signup' && window.location.pathname !== '/signin') {
        return (
            <nav style={{ background: 'white', height: '100px', paddingTop: '24px', }}>
                {/* Default header */}
                <Container style={{ maxWidth: 1800 }}>
                    <Toolbar>
                        <Hidden smDown>
                            <Typography noWrap sx={{ mx: 0, flexGrow: 1 }} onClick={navigateHome} > <img src={HeaderLogo} /> </Typography>

                            {((!logged)) &&
                                <>
                                    <Button variant="text" style={ButtonLink} onClick={navigateSignin}> Sign in </Button>
                                    <Typography sx={{ color: '#233D4D', fontWeight: 'normal', fontSize: '16px', lineHeight: '19px', }} >or</Typography>
                                    <Button variant="contained" style={ButtonMd} sx={{ ml: 2.8 }} onClick={navigateSignup}> SIGN UP </Button>
                                </>
                            }

                            {((logged)) &&
                                <>
                                    <Button variant="text" style={ButtonLink} onClick={navigateHome}> Home </Button>
                                    <Button variant="text" style={ButtonLink} > Profile settings </Button>
                                    <Button variant="text" style={ButtonLink} onClick={navigateSignout}> Logout </Button>
                                    <Avatar alt="profile-image" src={AvatarIcon} onClick={navigateProfile} sx={{ mx: 2.5 }} />
                                    <img alt="" src={AddIcon} />
                                </>
                            }

                        </Hidden>
                        <Hidden smUp >
                            <HamburgerHeader />
                        </Hidden>

                    </Toolbar>
                </Container>
            </nav >
        )
    } else {
        return null;
    }
}

export default Header;
