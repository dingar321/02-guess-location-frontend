import { useState } from 'react'
import { Hidden, Container, Toolbar, Typography, AppBar } from '@mui/material'
import HamburgerHeader from './HamburgerHeader'
import { useNavigate } from 'react-router-dom';

const headerLogo = require('../../../assets/images/HeaderLogo.png') as string;

const FormHeader = () => {

    //navigation between pages
    const navigate = useNavigate();

    return (
        <AppBar style={{ background: 'white', height: '100px', width: '50%', paddingTop: '20px', position: "absolute", left: 0 }} elevation={0}>
            <Toolbar style={{ marginLeft: 0 }}>
                < img alt='header-logo' src={headerLogo} onClick={() => navigate("/")} />
            </Toolbar >
        </AppBar >
    )
}

export default FormHeader;
