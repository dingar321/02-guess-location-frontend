import { useState } from 'react'
import { Hidden, Button, Container, Toolbar, Typography, Avatar, Box, SwipeableDrawer, Divider, AppBar, Paper } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonContained from '../../buttons/ContainedButton';
import ButtonText from '../../buttons/TextButton';
import ProfileButton from '../../buttons/ProfileButton';
import AddButton from '../../buttons/AddButton';
import BurgerButton from '../../buttons/BurgerButton';
import BurgerProfileButton from '../../buttons/BurgerProfileButton';
import OutlinedButton from '../../buttons/OutlinedButton';
import HomeButton from '../../buttons/HomeButton';
import CloseButton from '../../buttons/CloseButton';
import MenuButton from '../../buttons/MenuButton';
import ContainedButton from '../../buttons/ContainedButton';
import HamburgerHeader from './HamburgerHeader';

//images
const headerLogo = require('../../../assets/images/HeaderLogo.png') as string;
const HeaderLogo = require('../../../assets/images/HeaderLogo.png') as string;

const Header = () => {
    //Setting if user is logged in
    const [logged, setLogged] = useState<boolean>(false);

    //Opening and closing the burger menu
    const [openBurgerMenu, setOpenBurgerMenu] = useState<boolean>(false);


    //navigation between pages
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <nav style={{ background: 'white', height: '100px', paddingTop: '23px' }}>
            <Hidden mdDown>
                {/* Browser */}

                <Toolbar>
                    <Typography noWrap sx={{ mx: 0, flexGrow: 1 }}  >
                        <img alt='Navbar-logo' src={headerLogo} onClick={() => navigate("/")} />
                    </Typography>

                    {((!logged)) &&
                        <>
                            <ButtonText type='button' buttonText='Sign in' width={80} height={30} color="#233D4D" fontSize={16} fontWeight={500} onClick={() => navigate("/signin")} sx={null} />
                            <Typography sx={{ color: '#233D4D', fontWeight: 'normal', fontSize: '16px', lineHeight: '19px', }} >or</Typography>
                            <ButtonContained type='button' buttonText='SIGN UP' width={137} height={30} background="#619B8A" color="#FFFFFF" fontSize={16} fontWeight={400} onClick={() => navigate('/signup')} sx={{ ml: 3 }} />
                        </>
                    }

                    {((logged)) &&
                        <>
                            <ButtonText type='button' buttonText='Home' width={100} height={30} color="#233D4D" fontSize={16} fontWeight={500} onClick={() => navigate('/')} sx={{ mr: 1, mt: 0.8 }} />
                            <ButtonText type='button' buttonText='Profile Settings' width={140} height={30} color="#233D4D" fontSize={16} fontWeight={500} onClick={() => navigate('/')} sx={{ mr: 1, mt: 0.8 }} />
                            <ButtonText type='button' buttonText='Logout' width={100} height={30} color="#233D4D" fontSize={16} fontWeight={500} onClick={() => navigate('Logout')} sx={{ mr: 1, mt: 0.8 }} />
                            <ProfileButton onClick={null} sx={{ ml: 0, mr: 1 }} width={40} height={40} />
                            <AddButton onClick={null} sx={{ ml: 0, mr: 3 }} width={40} height={40} />
                        </>
                    }
                </Toolbar>
            </Hidden>


            <Hidden mdUp >
                {/* Devices (Hamburger Navbar)*/}
                <HamburgerHeader />
            </Hidden>
        </nav >
    )
}

export default Header;
