import { useState } from 'react'
import { AppBar, Button, Typography, IconButton, Box, Avatar, Paper } from '@mui/material'
import { SwipeableDrawer } from '@mui/material'
import { Divider } from '@mui/material'

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom'
import MenuButton from '../../buttons/MenuButton';
import CloseButton from '../../buttons/CloseButton';
import HomeButton from '../../buttons/HomeButton';
import ContainedButton from '../../buttons/ContainedButton';
import OutlinedButton from '../../buttons/OutlinedButton';
import BurgerButton from '../../buttons/BurgerButton';
import BurgerProfileButton from '../../buttons/BurgerProfileButton';
import AddButton from '../../buttons/AddButton';

const HeaderLogo = require('../../../assets/images/HeaderLogo.png') as string;

const HamburgerHeader = () => {

    //navigation between pages
    const navigate = useNavigate();
    //Opening and closing the burger menu
    const [openBurgerMenu, setOpenBurgerMenu] = useState<boolean>(false);

    //Setting if user is logged in
    const [logged, setLogged] = useState<boolean>(false);

    return (
        <div>
            <AppBar sx={{ pt: 2, px: 0, padding: 3, heigth: 400, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', background: 'white' }} component={Paper} elevation={2}>

                {((!logged)) &&
                    <>
                        <Typography noWrap sx={{ mx: 0, flexGrow: 1 }} onClick={() => navigate("/")}> <img src={HeaderLogo} /> </Typography>
                        <MenuButton onClick={() => setOpenBurgerMenu(true)} sx={{ sm: 1, mx: 5 }} />
                    </>
                }

                {((logged)) &&
                    <>
                        <Typography noWrap sx={{ mx: 0, flexGrow: 1 }} onClick={() => navigate("/")}> <img src={HeaderLogo} /> </Typography>
                        <div>
                            <AddButton onClick={null} sx={{ mr: 5 }} width={40} height={40} />
                            <MenuButton onClick={() => setOpenBurgerMenu(true)} sx={{ sm: 1, mx: 5 }} />
                        </div>
                    </>
                }
            </AppBar>

            {/* Swipable drawer -> the actuall hamburger navbar */}
            <SwipeableDrawer anchor='top' open={openBurgerMenu} onOpen={() => setOpenBurgerMenu(true)} onClose={() => setOpenBurgerMenu(false)}>
                <div>
                    <CloseButton onClick={() => setOpenBurgerMenu(false)} sx={null} />
                </div>
                <Divider />
                {/* Hamburger header content */}
                {((!logged)) &&
                    < div >
                        <Box sx={{ my: 2, mx: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {/* Guest */}
                            <HomeButton onClick={() => navigate("/")} sx={null} />
                            <ContainedButton type='button' height={50} width={350} buttonText='SIGN UP' fontWeight={400} fontSize={16} color='#FFFFFF' background='#619B8A'
                                sx={{ my: 0.5, mx: 5, }} onClick={() => navigate("/signin")} />
                            <OutlinedButton type='button' height={50} width={350} buttonText='SIGN IN' fontWeight={400} fontSize={16} color='#619B8A' borderColor='#619B8A'
                                sx={{ my: 0.5, mx: 5, }} onClick={() => navigate("/signup")} background='#FFFFFF' />
                        </Box>
                    </div>
                }

                {
                    ((logged)) &&
                    <div>
                        <Box sx={{ my: 2, mx: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {/* Logged in */}
                            <BurgerProfileButton sx={null} onClick={null} buttonText='Home' color='#233D4D' firstName='John' lastName='Doe' />
                            <BurgerButton sx={null} onClick={null} buttonText='Home' color='#233D4D' />
                            <BurgerButton sx={null} onClick={null} buttonText='Profile Settings' color='#233D4D' />
                            <BurgerButton sx={null} onClick={null} buttonText='Logout' color='#619B8A' />
                        </Box>
                    </div>
                }
            </SwipeableDrawer >
        </div >
    )
}

export default HamburgerHeader