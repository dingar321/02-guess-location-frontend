import React from 'react'
import { Avatar, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import { VisibilityOff } from '@mui/icons-material';

const RightSideVector = require('../../assets/images/form-right-vector.png') as string;
const AvatarIcon = require('../../assets/icons/avatar-icon.png') as string;

const Signin = () => {

    //Submit
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };


    return (
        <div>
            <Grid container style={{}}>
                <Grid item xs={12} sm={6} style={{ padding: 100, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {/* Form */}
                    <div />
                    <div style={{ textAlign: 'center' }}>
                        <Grid container style={{ display: 'flex', flexDirection: 'column' }}>

                        </Grid>
                    </div>
                    <div />
                    {/* /Form */}
                </Grid>
                <Grid container item xs={12} sm={6}>
                    <img src={RightSideVector} style={{ width: '100%', height: '100vh', objectFit: 'cover' }} alt="" />
                </Grid>
            </Grid>
        </div >
    )
}

export default Signin