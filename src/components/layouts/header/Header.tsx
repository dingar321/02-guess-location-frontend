import { useState } from 'react'
import { Hidden, Toolbar, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonContained from '../../buttons/ContainedButton';
import ButtonText from '../../buttons/TextButton';
import ProfileButton from '../../buttons/ProfileButton';
import AddButton from '../../buttons/AddButton';
import HamburgerHeader from './HamburgerHeader';
import { useRecoilState } from 'recoil'
import User from '../../../utils/types/User';
import { UserState } from '../../../utils/common/UserRecoil';
import axios from 'axios';

//images
const headerLogo = require('../../../assets/images/HeaderLogo.png') as string;

const Header = () => {

    //navigation between pages
    const navigate = useNavigate();

    //User state
    const [loggedUser, setLoggedUser] = useRecoilState<User>(UserState);

    //Logout
    const logout = () => {
        const logoutUser = async () => {
            await axios(
                {
                    method: 'POST',
                    url: 'http://localhost:3333/auth/logout',
                    withCredentials: true,
                }
            ).then(response => {
                //When logged out we go back to signin page
                navigate("/signin");
            }).catch(error => {
                console.log('error: ', error);
            });
        }
        logoutUser();
    }

    return (
        <nav style={{ background: 'white', height: '100px', paddingTop: '23px' }}>
            <Hidden mdDown>
                {/* Browser */}

                <Toolbar>
                    <Typography noWrap sx={{ mx: 0, flexGrow: 1 }}  >
                        <img alt='Navbar-logo' src={headerLogo} onClick={() => navigate("/")} />
                    </Typography>

                    {((!loggedUser)) &&
                        <>
                            <ButtonText type='button' buttonText='Sign in' width={80} height={30} color="#233D4D" fontSize={16} fontWeight={500} onClick={() => navigate("/signin")} sx={null} />
                            <Typography sx={{ color: '#233D4D', fontWeight: 'normal', fontSize: '16px', lineHeight: '19px', }} >or</Typography>
                            <ButtonContained type='button' buttonText='SIGN UP' width={137} height={30} background="#619B8A" color="#FFFFFF" fontSize={16} fontWeight={400} onClick={() => navigate('/signup')} sx={{ ml: 3 }} />
                        </>
                    }

                    {((loggedUser)) &&
                        <>
                            <ButtonText type='button' buttonText='Home' width={100} height={30} color="#233D4D" fontSize={16} fontWeight={500} onClick={() => navigate('/')} sx={{ mr: 1, mt: 0.8 }} />
                            <ButtonText type='button' buttonText='Profile Settings' width={140} height={30} color="#233D4D" fontSize={16} fontWeight={500} onClick={null} sx={{ mr: 1, mt: 0.8 }} />
                            <ButtonText type='button' buttonText='Logout' width={100} height={30} color="#233D4D" fontSize={16} fontWeight={500} onClick={logout} sx={{ mr: 1, mt: 0.8 }} />
                            <ProfileButton onClick={null} sx={{ ml: 0, mr: 1 }} width={40} height={40} />
                            <div style={{ fontSize: 11 }}>
                                <p>
                                    Welcome, <br /> {loggedUser.firstName} {loggedUser.lastName}
                                </p>
                            </div>
                            <AddButton onClick={null} sx={{ ml: 3, mr: 3 }} width={40} height={40} />
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
