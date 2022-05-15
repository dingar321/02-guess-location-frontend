import { useState } from 'react'
import { Hidden, Button, Container, Toolbar, Typography, Avatar } from '@mui/material'
import HamburgerHeader from './HamburgerHeader'
import ButtonMd from '../buttons/ButtonMd';
import ButtonLink from '../buttons/ButtonLink';

//images
const HeaderLogo = require('../../assets/images/header-logo-full.png') as string;
const AddIcon = require('../../assets/icons/add-icon.png') as string;
const AvatarIcon = require('../../assets/icons/avatar-icon.png') as string;

const Header = () => {
    //Setting if user is logged in
    const [logged, setLogged] = useState<boolean>(true);

    return (
        <nav style={{ background: 'white', height: '100px', paddingTop: '20px', }}>
            {/* Default header */}
            <Container style={{ maxWidth: 1500 }}>
                <Toolbar disableGutters>
                    <Hidden smDown>
                        <Typography noWrap sx={{ mx: 0, flexGrow: 1 }} style={{ paddingLeft: '40px' }} > <img src={HeaderLogo} /> </Typography>
                        {((!logged)) &&
                            <>
                                <Button variant="text" style={ButtonLink}> Sign in </Button>
                                <Typography sx={{ color: '#233D4D', fontWeight: 'normal', fontSize: '16px', lineHeight: '19px', }} >or</Typography>
                                <Button variant="contained" style={ButtonMd} sx={{ ml: 2.8 }} > SIGN UP </Button>
                            </>
                        }

                        {((logged)) &&
                            <>
                                <Button variant="text" style={ButtonLink}> Home </Button>
                                <Button variant="text" style={ButtonLink}> Profile settings </Button>
                                <Button variant="text" style={ButtonLink}> Logout </Button>
                                <Avatar alt="profile-image" src={AvatarIcon} sx={{ mx: 2.5 }} />
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
}

export default Header;
